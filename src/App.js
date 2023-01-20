import React, { useEffect } from 'react';
import Table from './components/Table';
import useFetch from './hooks/useFetch';
import './styles/App.css';

function App() {
  const { isLoading } = useFetch();

  return (
    <>
      { isLoading ? <p>Loading...</p> : <Table /> }
    </>
  );
}

export default App;
