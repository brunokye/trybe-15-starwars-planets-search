import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/header.css';

export default function Header() {
  const { setPlanets, search } = useContext(PlanetsContext);

  function handleInput({ target }) {
    setPlanets(search.filter(({ name }) => (
      name.toLowerCase().includes(target.value.toLowerCase()))));
  }

  return (
    <div className="header-container">
      <h1>TrybeWars</h1>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Nome do planeta"
        onChange={ handleInput }
      />
    </div>
  );
}
