import React, { useEffect, useState } from 'react';
import CountryInfo from './components/CountryInfo';

import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data);
    });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      find countries{' '}
      <input onChange={(e) => setSearch(e.target.value)} value={search} />
      <CountryInfo
        countries={countries}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}

export default App;
