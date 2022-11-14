import React from 'react'
import { useGetLocalStorage } from '../hooks/hooks';
import UserForm from './UserForm';
import PokemonSearch from './PokemonSearch';

function PokeApp() {
  useGetLocalStorage();
  return (
    <>
      <UserForm />
      <PokemonSearch />
    </>
  )
}

export default PokeApp