import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [isLoading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState([]);
  const [initialType, setInitialType] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const context = { isLoading,
    setLoading,
    planets,
    setPlanets,
    search,
    setSearch,
    initialType,
    setInitialType };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
