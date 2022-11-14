import React, { useContext } from 'react'
import { useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { capitalizeFirstLetter } from '../functions';

function AlertModal({ closeModal }) {
  const { state, setState } = useContext(GlobalContext)
  const { form, pokemonSearch } = state;
  const {category, searchValue} = pokemonSearch;

  const [fetchStatus, setFetchStatus] = useState(null) // State for fetching status
  const [loading, setLoading] = useState(false) // State for loading icon
  
  const submitPokeSearch = () => {
    fetch(`http://pokeapi.co/api/v2/${category}/${searchValue ? searchValue + '/' : ''}`, { method: 'HEAD' })
      .then(status => {
        if(status.ok) {
            setTimeout(() => {
              setLoading(true);
              setTimeout(() => {
                setFetchStatus(true);
                setLoading(false);
                setTimeout(() => {
                  setState(prevState => ({
                    ...prevState,
                    submitFlag: `${category} - ${searchValue}`
                  }))
                  setLoading(false);
                  closeModal();
                }, 700);
              }, 400)
            }, 50)
            
          } else {
            setTimeout(() => {
              setLoading(true);
              setTimeout(() => {
                setFetchStatus(false);
                setLoading(false);
                setTimeout(() => {
                  setState(prevState => ({
                    ...prevState,
                    submitFlag: `${category} - ${searchValue}`
                  }))
                  setLoading(false);
                }, 700);
              }, 400)
            }, 50)
          }
      })
  }

  return (
    <div id="popup-modal" tabindex="-1" className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-900 md:inset-0 h-modal md:h-full bg-opacity-40 ">
      <div className="relative w-full h-full max-w-md p-4 md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-6 text-center">
            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to submit the following information?</h3>
            <div className="">
              <div className="p-2 m-2 border rounded appearance-none focus:outline-none focus:shadow-outline">
                <p className="mb-1 font-bold text-left text-gray-500 text-md">User Info: </p>
                <p className="mb-1 font-bold text-left text-gray-500 text-md">First Name: <span className="mb-1 font-normal text-left text-gray-500 text-md"> {form.firstName}</span></p>
                <p className="mb-1 font-bold text-left text-gray-500 text-md">Last Name: <span className="mb-1 font-normal text-left text-gray-500 text-md"> {form.lastName}</span></p>
                <p className="mb-1 font-bold text-left text-gray-500 text-md">Phone: <span className="mb-1 font-normal text-left text-gray-500 text-md"> {form.phone}</span></p>
                <p className="mb-1 font-bold text-left text-gray-500 text-md">Address: <span className="mb-1 font-normal text-left text-gray-500 text-md"> {form.address}</span></p>
              </div>
              <div className="p-2 m-2 border rounded appearance-none focus:outline-none focus:shadow-outline">
                <p className="mb-1 font-bold text-left text-gray-500 text-md">Pokemon Search Info: </p>
                <p className="font-bold text-left text-gray-500 text-md">Category: <span className="mb-1 font-normal text-left text-gray-500 text-md"> {capitalizeFirstLetter(pokemonSearch.category)}</span></p>
                <p className="font-bold text-left text-gray-500 text-md">Search: <span className="mb-1 font-normal text-left text-gray-500 text-md"> {capitalizeFirstLetter(pokemonSearch.searchValue)}</span></p>
              </div>
            </div>
            <div className="flex items-center p-2 m-2 border rounded appearance-none focus:outline-none focus:shadow-outline">
              <span className="font-normal text-left">Success? {fetchStatus === true ? 'Yes!' : fetchStatus === false ? 'No, the search was invalid please change pokemon category or search value.' : ''}</span>
              {loading === true ? <div className="pl-2" role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
              </div> : null}
            </div>
            <button onClick={() => submitPokeSearch()} data-modal-toggle="popup-modal" type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Yes, I'm sure
            </button>
            <button onClick={() => closeModal()} data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">No, cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertModal