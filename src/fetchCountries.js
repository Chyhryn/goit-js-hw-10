function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw Error(`response.ok is ${response.ok}`);
    }
    return response.json();
  });
}

export default { fetchCountries };
