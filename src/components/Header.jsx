import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/header.css';

export default function Header() {
  const { planets, setPlanets, search,
    initialTags, setInitialTags } = useContext(PlanetsContext);
  const [tagList] = useState(initialTags);
  const [tag, setTag] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);
  const MAXIMUM_FILTERS = 5;

  useEffect(() => {
    if (filters.length > 0) {
      const unusedTags = tagList.filter((list) => (
        !filters.map(({ column }) => column).includes(list)
      ));

      setInitialTags(unusedTags);
      setTag(unusedTags[0]);
    }
  }, [filters, tagList, setInitialTags]);

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

  const filterPlanets = (state, column, comparison, value) => {
    if (comparison === 'maior que') {
      return state.filter((planet) => (Number(planet[column]) > value));
    }
    if (comparison === 'menor que') {
      return state.filter((planet) => (Number(planet[column]) < value));
    }
    return state.filter((planet) => (Number(planet[column] === value)));
  };

  const applyFilter = () => {
    saveFilters();
    setPlanets(filterPlanets(search, tag, operator, number));
  };

  const applyMultipleFilters = () => {
    saveFilters();
    setPlanets(filterPlanets(planets, tag, operator, number));
  };

  const handleRemove = (column) => {
    const filtersToKeep = filters.filter((filter) => filter.column !== column);
    setFilters(filtersToKeep);
    setInitialTags([...initialTags, column]);

    let filteredPlanets = search;

    if (filtersToKeep.length > 0) {
      filtersToKeep.forEach(({ column: tagType, comparasion, value }) => {
        filteredPlanets = filterPlanets(filteredPlanets, tagType, comparasion, value);
      });
    }
    setPlanets(filteredPlanets);
  };

  const handleClear = () => {
    setFilters([]);
    setPlanets(search);
    setTag('population');
    setOperator('maior que');
    setNumber(0);
    setInitialTags(['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
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
          value={ tag }
          onChange={ handleFilter }
        >
          { initialTags.map((column) => (
            <option key={ column } value={ column }>{ column }</option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          name="operator"
          value={ operator }
          onChange={ handleFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          type="number"
          name="number"
          value={ number }
          onChange={ handleFilter }
        />

        <button
          type="button"
          data-testid="button-filter"
          disabled={ initialTags.length === 0 }
          onClick={ filters.length === 0 ? applyFilter : applyMultipleFilters }
        >
          Filtrar
        </button>

        <button
          type="button"
          data-testid="button-remove-filters"
          disabled={ initialTags.length === MAXIMUM_FILTERS }
          onClick={ handleClear }
        >
          Remover Filtros
        </button>
      </div>

      <div className="filter-list-container">
        { filters.map(({ column, comparasion, value }) => (
          <span
            data-testid="filter"
            className="align-filter-items"
            key={ column }
          >
            {`${column} | ${comparasion} | ${value}`}
            <button
              className="delete-filter"
              type="button"
              onClick={ () => handleRemove(column) }
            >
              🗑
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
