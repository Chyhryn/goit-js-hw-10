import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const ulEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(event) {
  const inputData = event.target.value.trim();

  if (inputData === '') {
    clearMarkup();
    return;
  }
  fetchCountries(inputData).then(createMarkup).catch(catchError);
}

function createMarkup(country) {
  if (country.length > 10) {
    clearMarkup();
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (country.length >= 2 && country.length <= 10) {
    const markup = country
      .map(
        elem =>
          `<li class="country-item"><img class="country-flag" src="${elem.flags.svg}" alt="${elem.name.official}" width="30" height="30"/><span class="country-name">${elem.name.official}</span></li>`
      )
      .join('');
    divEl.innerHTML = '';
    ulEl.innerHTML = markup;
    return;
  }
  ulEl.innerHTML = '';
  const languagesValue = Object.values(country[0].languages).join(', ');
  divEl.innerHTML = `<h1 class="country-title"><img class="country-flag" src="${country[0].flags.svg}" alt="${country[0].name.official}" width="30" height="30"/>${country[0].name.official}</h1><p class="country-text"><b>Capital:</b> ${country[0].capital}</p><p class="country-text"><b>Population:</b> ${country[0].population}</p><p class="country-text"><b>Languages:</b> ${languagesValue}</p>`;
}

function catchError(error) {
  clearMarkup();
  Notiflix.Notify.failure('Oops, there is no country with that name');
  console.log(error);
}

function clearMarkup() {
  ulEl.innerHTML = '';
  divEl.innerHTML = '';
}
