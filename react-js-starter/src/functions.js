export const getStorage = (type) => localStorage.getItem(type); // Function to get local storage
export const setStorage = (type, value) => localStorage.setItem(type, JSON.stringify(value)) // Function to set local storage

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1); // Function for capitalizing first letter

// Function that fetches pokemon from pokeapi based on name, type, or ability
export async function fetchPokemon(searchValue, category, setState) {
  const res = await fetch(`http://pokeapi.co/api/v2/${category}/${searchValue ? searchValue + '/' : ''}`)
  const data = await res.json()

  if(category === 'pokemon' && searchValue === '') {
    return [...data.results.map(async item => {
      try {
        const res2 = await fetch(item.url)
        const data2 = await res2.json();
        return {...item, ...data2}
      } catch(e) {
        throw e;
      }
    })]
  } if(category === 'pokemon' && searchValue.length > 0) {
    return [{...data}];
  } if(category === 'type' || category === 'ability') {
    return [...data.pokemon.map(async item => {
      try {
        const res2 = await fetch(item.pokemon.url)
        const data2 = await res2.json();
        return {...item.pokemon, ...data2}
      } catch(e) {
        throw e;
      }
    })]
  }

}