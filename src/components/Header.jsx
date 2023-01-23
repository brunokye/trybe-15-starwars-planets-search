import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/header.css';

export default function Header() {
  const { setPlanets, search, planets,
    initialType, setInitialType } = useContext(PlanetsContext);
  const [type] = useState(initialType);
  const [tag, setTag] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (filters.length > 0) {
      const newFilter = type.filter((types) => (
        !filters.map((filter) => filter.column).includes(types)
      ));

      setInitialType(newFilter);
      setTag(newFilter[0]);
    }
  }, [filters, type, setInitialType]);

  const handleName = ({ target }) => {
    setPlanets(search.filter(({ name }) => (
      name.toLowerCase().includes(target.value.toLowerCase()))));
  };

  const handleFilter = ({ target }) => {
    const { name, value } = target;

    if (name === 'tag') return setTag(value);
    if (name === 'operator') return setOperator(value);
    if (name === 'number') return setNumber(value);
  };

  const saveFilters = () => {
    setFilters([...filters, {
      column: tag,
      comparasion: operator,
      value: number,
    }]);
  };

  const applyFilter = () => {
    saveFilters();

    if (operator === 'maior que') {
      return setPlanets(search
        .filter((planet) => (Number(planet[tag]) > number)));
    }
    if (operator === 'menor que') {
      return setPlanets(search
        .filter((planet) => (Number(planet[tag]) < number)));
    }
    return setPlanets(search
      .filter((planet) => (Number(planet[tag] === number))));
  };

  const applyMultipleFilters = () => {
    saveFilters();

    if (operator === 'maior que') {
      return setPlanets(planets
        .filter((planet) => (Number(planet[tag]) > number)));
    }
    if (operator === 'menor que') {
      return setPlanets(planets
        .filter((planet) => (Number(planet[tag]) < number)));
    }
    return setPlanets(planets
      .filter((planet) => (Number(planet[tag] === number))));
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
          onChange={ handleFilter }
        >
          { initialType.map((filter) => (
            <option key={ filter } value={ filter }>{ filter }</option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          name="operator"
          onChange={ handleFilter }
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
          onChange={ handleFilter }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ filters.length === 0 ? applyFilter : applyMultipleFilters }
        >
          Filtrar
        </button>
      </div>

      <div className="filter-list-container">
        { filters.map(({ column, comparasion, value }) => (
          <span className="align-filter-items" key={ column }>
            {`${column} | ${comparasion} | ${value}`}
            <button
              className="delete-filter"
              type="button"
            >
              🗑
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
