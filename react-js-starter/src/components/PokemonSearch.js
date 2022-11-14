import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useFetchPokemon } from '../hooks/hooks';

function PokemonSearch() {

  const { state } = useContext(GlobalContext);

  const { pokemons, pokemonSearch, submitFlag } = state;
  
  useFetchPokemon(submitFlag, pokemonSearch.category, pokemonSearch.searchValue);
  
  return (
    <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {pokemons.map(({name, sprites, types, abilities}) => {
          return (
            <div className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
              <div className="grid items-center justify-center grid-cols-2">
                <div>
                  <p>{name}</p>
                  <img src={sprites.front_default} alt="" />
                </div>
                <div>
                  <p className="mb-2">Types: {types.map(({type}) => `${type.name} `)}</p>
                  <p>Abilities: {abilities.map(({ability}) => `${ability.name} `)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PokemonSearch