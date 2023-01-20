import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/header.css';

export default function Header() {
  const { setPlanets, search } = useContext(PlanetsContext);
  const [tag, setTag] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);

  const handleName = ({ target }) => {
    setPlanets(search.filter(({ name }) => (
      name.toLowerCase().includes(target.value.toLowerCase()))));
  };

  const handleNumber = ({ target }) => {
    const { name, value } = target;

    if (name === 'tag') return setTag(value);
    if (name === 'operator') return setOperator(value);
    if (name === 'number') return setNumber(value);
  };

  const handleFilter = () => {
    console.log(operator);

    if (operator === 'maior que') {
      return setPlanets(search
        .filter((planet) => (Number(planet[tag]) > number)));
    }
    if (operator === 'menor que') {
      return setPlanets(search
        .filter((planet) => (Number(planet[tag]) < number)));
    }
    if (operator === 'igual a') {
      return setPlanets(search
        .filter((planet) => (Number(planet[tag] === number))));
    }
  };

  return (
    <div className="header-container">
      <div>
        <h1>TrybeWars</h1>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Nome do planeta"
          onChange={ handleName }
        />
      </div>

      <div className="filter-container">
        <select
          data-testid="column-filter"
          name="tag"
          onChange={ handleNumber }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          name="operator"
          onChange={ handleNumber }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="number"
          value={ number }
          onChange={ handleNumber }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilter }
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
