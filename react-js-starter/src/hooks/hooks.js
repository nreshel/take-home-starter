import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { fetchPokemon, getStorage } from '../functions';

// Hook for getting local saved storage for user inputs and pokemon category & search
export const useGetLocalStorage = () => {
  const { state, setState } = useContext(GlobalContext);
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...(localStorage.getItem("userForm") !== null) && {
        form: JSON.parse(getStorage("userForm"))
      },
      pokemonSearch: {
        ...state.pokemonSearch,
        ...(localStorage.getItem("pokemonCategory") !== null) && { 
          category: JSON.parse(localStorage.getItem("pokemonCategory")) 
        },
        ...(localStorage.getItem("pokemonSearch") !== null) && { 
          searchValue: JSON.parse(localStorage.getItem("pokemonSearch")) 
        }
      }
    }))
  }, [])
}

// Hook for fetching pokemon from pokeapi
export const useFetchPokemon = (submitFlag, category, searchValue) => {
  const { state, setState } = useContext(GlobalContext);
  useEffect(() => {
    fetchPokemon(searchValue, category, setState)
    .then(data => {
      Promise.all([...data])
        .then(items => {
          if(state?.form) {
            setState(prevState => ({
              ...prevState,
              pokemons: [...items],
            }))
          }
        })
      })
  }, [submitFlag])
}