const API = "https://restcountries.com/v3.1/all"
const elCountryTemplate = document.querySelector("[data-country-template]")
const elCountriesWrapper = document.querySelector("[data-countries-wrapper]")
const elSearchInput = document.querySelector("[data-search-input]")

async function getData(resource) {
  const res = await fetch(resource)
  const searchResult = await res.json()
  renderCountries(searchResult)
  searchCountries(searchResult)
}

getData(API)

// Render countries function
function renderCountries(countries) {
  elCountriesWrapper.innerHTML = ""
  countries.forEach(country => {
    const elCountryCard = elCountryTemplate.content.cloneNode(true)
    const elCountryCardImg = elCountryCard.querySelector("[data-country-img]")
    elCountryCardImg.src = country.flags.png
    elCountryCardImg.alt = country.name.common
    elCountryCardImg.width = 320
    elCountryCard.querySelector("[data-country-title]").textContent = country.name.common
    elCountryCard.querySelector("[data-country-capital-text]").textContent = country.capital
    elCountryCard.querySelector("[data-country-continent-text]").textContent = country.continents

    elCountriesWrapper.appendChild(elCountryCard)
  });
}


// Function search
function searchCountries(countries) {
  elSearchInput.addEventListener("keyup", () => {
    
    const searchedCountries = []

    countries.forEach(country => {
      if (country.name.common.toLowerCase().includes(elSearchInput.value.toLowerCase())) {
        searchedCountries.push(country)
      }
    })
    renderCountries(searchedCountries)
  })
}