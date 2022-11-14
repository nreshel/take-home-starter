import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import Errors from '../errors';
import { setStorage } from '../functions';
import AlertModal from './AlertModal';

const regexValidators = {
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  firstName: /^[a-zA-Z ]{2,30}$/,
  lastName: /^[a-zA-Z ]{2,30}$/,
  address: /^[a-zA-Z0-9\s,'-]*$/
}

function UserForm() {

  const { state, setState } = useContext(GlobalContext)
  const { form, pokemonSearch } = state

  const [showDropdown, setShowDropdown] = useState(false); // State for category dropdown

  const [showModal, setShowModal] = useState(false); // State for modal toggling

  const [validFields, setValidFields] = useState({ // State for user input check validation
    firstName: false,
    lastName: false,
    phone: false,
    address: false
  });

  // Function for changing form field value being the input value and type being the input type
  const changeFormField = (value, type) => {
    const newForm = {
      ...form,
      [type]: value
    }
    setState({
      ...state,
      form: newForm
    });
    setStorage('userForm', newForm)
  }
  
  const submitForm = (e) => {
    e.preventDefault();

    const errors = new Errors(form, regexValidators);

    setValidFields(errors.validateErrors()); // Set array of bools for each input field to check if valid or not
    
    const allValidFields = Object.values(errors.validateErrors()).every( // Check if all input fields are valid
      value => value === false
    );
    
    setState(prevState => ({
      ...prevState,
      pokemonSearch: {
        ...prevState.pokemonSearch,
        searchValue: prevState.pokemonSearch.searchValue.toLowerCase().trim().replaceAll(' ', '-'),
      }
    }))
    
    if(allValidFields) { // If all user input fields are valid proceed with toggling modal
      setShowModal(prevState => !prevState)
    }
  }

  // Function for onClick function for setting pokemon categoy
  const onClickCategories = (value) => {
    setState(prevState => ({
      ...prevState,
      pokemonSearch: {
        ...prevState.pokemonSearch,
        category: value
      }
    }))
    setStorage("pokemonCategory", value) // Saves pokemon category into local memory
    setShowDropdown(bool => !bool) // Toggles category dropdown
  }

  const onChangeSearch = (value) => {
    setState(prevState => ({
      ...prevState,
      pokemonSearch: {
        ...prevState.pokemonSearch,
        searchValue: value
      }
    }))
    setStorage('pokemonSearch', value) // Saves pokemon search value to local memory
  }

  const closeModal = () => setShowModal(prevState => !prevState) // Closes modal
  
  return (
    <>
      {showModal && <AlertModal closeModal={() => closeModal()} />}
      <form onSubmit={(e) => submitForm(e)} action="" className="px-8 pt-6 pb-8 mb-4 bg-white rounded-sm shadow-md">
      <div className="mb-4">
          {validFields.firstName && <span className="text-sm text-red-500">Please fill First Name correctly</span>}
          <label className="block mb-2 text-sm font-bold text-gray-700" for="username">
            First Name
          </label>
          <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-sm shadow appearance-none focus:outline-none focus:shadow-outline" onChange={(e) => changeFormField(e.target.value, 'firstName')} value={form.firstName} type="text" placeholder="First Name" />
        </div>
        <div className="mb-4">
          {validFields.lastName && <span className="text-sm text-red-500">Please fill Last Name correctly</span>}
          <label className="block mb-2 text-sm font-bold text-gray-700" for="username">
            Last Name
          </label>
          <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-sm shadow appearance-none focus:outline-none focus:shadow-outline" onChange={(e) => changeFormField(e.target.value, 'lastName')} value={form.lastName} type="text" placeholder="Last Name" />
        </div>
        <div className="mb-4">
          {validFields.phone && <span className="text-sm text-red-500">Please fill Phone Number correctly</span>}
          <label className="block mb-2 text-sm font-bold text-gray-700" for="username">
            Phone Number
          </label>
          <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-sm shadow appearance-none focus:outline-none focus:shadow-outline" onChange={(e) => changeFormField(e.target.value, 'phone')} value={form.phone} type="text" placeholder="Phone Number" />
        </div>
        <div className="mb-6">
          {validFields.address && <span className="text-sm text-red-500">Please fill Address correctly</span>}
          <label className="block mb-4 text-sm font-bold text-gray-700" for="username">
            Address
          </label>
          <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-sm shadow appearance-none focus:outline-none focus:shadow-outline" onChange={(e) => changeFormField(e.target.value, 'address')} value={form.address} type="text" placeholder="Address" />
        </div>
        <div className="flex mb-4">
          <label for="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
          <button id="dropdown-button" onClick={() => setShowDropdown(bool => !bool)} data-dropdown-toggle="dropdown" className="z-10 inline-flex items-center flex-shrink-0 px-3 py-2 text-sm font-medium leading-tight text-center text-gray-700 border rounded-l-sm shadow appearance-none focus:outline-none focus:shadow-outline" type="button">{pokemonSearch.category.length <= 0 ? 'All categories' : pokemonSearch.category[0].toUpperCase() + pokemonSearch.category.substring(1)} <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
          <div id="dropdown" className={`${showDropdown === false ? 'hidden' : ''} z-10 w-44 bg-white rounded-sm divide-y shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{position: "absolute", inset: "auto auto 181px auto", margin: "0px",}}>
            <ul className="py-1 text-sm" aria-labelledby="dropdown-button">
              <li>
                <button type="button" onClick={() => onClickCategories('pokemon')} className="inline-flex w-full px-4 py-2 hover:bg-slate-100 ">Pokemon</button>
              </li>
              <li>
                <button type="button" onClick={() => onClickCategories('type')} className="inline-flex w-full px-4 py-2 hover:bg-slate-100 ">Type</button>
              </li>
              <li>
                <button type="button" onClick={() => onClickCategories('ability')} className="inline-flex w-full px-4 py-2 hover:bg-slate-100 ">Ability</button>
              </li>
            </ul>
          </div>
          <div className="relative w-full">
            <input type="search" id="search-dropdown" className="z-20 block w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-r-sm shadow appearance-none focus:outline-none focus:shadow-outline" onChange={(e) => onChangeSearch(e.target.value)} value={pokemonSearch.searchValue} placeholder="Search by Pokemon, Type, Ability..." />
          </div>
        </div>
        <div className="mt-2">
          <input type="submit" value="Submit" className="px-2 py-1 bg-blue-700 rounded-sm shadow text-slate-100 "/>
        </div>
      </form>
    </>
  )
}

export default UserForm