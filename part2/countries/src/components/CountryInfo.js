import React from 'react';
import WeatherInfo from './WeatherInfo';

const CountryInfo = ({ countries, search, setSearch }) => {
  const filteredCountries = (countries) => {
    return countries.filter((country) => {
      return country.name.toLowerCase().includes(search.toLowerCase());
    });
  };

  const info = (countries) => {
    if (countries.length === 1) {
      const country = countries[0];
      return (
        <div>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>

          <h3>languages</h3>
          <ul>
            {country.languages.map((lang) => {
              return <li key={lang.name}>{lang.name}</li>;
            })}
          </ul>
          <img style={{ height: '100px' }} src={country.flag} alt="flag" />
          {/* weather */}
          <WeatherInfo capital={country.capital} />
        </div>
      );
    } else if (countries.length < 10) {
      return countries.map((country) => (
        <div key={country.name}>
          <span>{country.name}</span>
          <button onClick={() => setSearch(country.name)}>select</button>
        </div>
      ));
    } else {
      return 'Too many matches, please be more specific.';
    }
  };

  return <div>{search && info(filteredCountries(countries))}</div>;
};

export default CountryInfo;
