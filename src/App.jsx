import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [search, setSearch] = useState('');
  //const [currentPage, setCurrentPage] = useState('1');

  useEffect(() => {
    if (search !== '') {
      try {
        const searchParams = new URLSearchParams({
          client_id: 'bF_HerDN5h7a7WozJpD-AEWD08N_mhzLLSreF6YpFxA',
          query: search,
          per_page: 15,
          page: 1,
        });

        const dataRequest = async () => {
          const response = await axios.get(
            `https://api.unsplash.com/?${searchParams}`
          );
          return response.data;
        };

        console.log(dataRequest());
      } catch (error) {
        console.log(error);
      }
    }
  }, [search]);

  const handleSearch = searchRequest => {
    setSearch(searchRequest);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}

export default App;
