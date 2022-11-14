import React, { createContext, useState } from 'react'

// Initial states 
const initialState = {
  form: {
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  },
  pokemonSearch: {
    category: 'pokemon',
    searchValue: ''
  },
  submitFlag: '',
  pokemons: [],
  fetchStatus: null,
}

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  return (
    <GlobalContext.Provider value={{state, setState}}>
      {children}
    </GlobalContext.Provider>
  );
}