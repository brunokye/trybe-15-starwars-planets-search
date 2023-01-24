import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockData from './mockData';

describe('Testa o componente "Header"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    })
  })

  afterEach (() => {
    jest.clearAllMocks();
  })

  it('1 - Verifica os elementos da tela.', () => {
    render(<App />);

    const title = screen.getByRole('heading', { name: /trybewars/i });
    const name = screen.getByTestId('name-filter');
    const tag = screen.getByTestId('column-filter');
    const operator = screen.getByTestId('comparison-filter');
    const number = screen.getByTestId('value-filter');
    const applyFilter = screen.getByRole('button', { name: /filtrar/i });
    const clearFilters = screen.getByRole('button', { name: /remover filtros/i });

    expect(title).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(operator).toBeInTheDocument();
    expect(number).toBeInTheDocument();
    expect(applyFilter).toBeInTheDocument();
    expect(clearFilters).toBeInTheDocument();
  });

  it('2 - Verifica o filtro por nome.', async () => {
    await act (() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    });

    const name = screen.getByTestId('name-filter');
    
    userEvent.type(name, 'tato');
    
    const planet = screen.getByText(/tatooine/i);
    const incorrect = screen.queryByText(/alderaan/i);

    expect(planet).toBeInTheDocument();
    expect(incorrect).not.toBeInTheDocument();
  });

  it('3 - Verifica um único filtro numérico.', async () => {
    await act (() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    });

    const tag = screen.getByTestId('column-filter');
    const operator = screen.getByTestId('comparison-filter');
    const number = screen.getByTestId('value-filter');
    const applyFilter = screen.getByRole('button', { name: /filtrar/i });
    
    userEvent.selectOptions(tag, 'population');
    userEvent.selectOptions(operator, 'igual a');
    userEvent.clear(number);
    userEvent.type(number, '2000000000')
    userEvent.click(applyFilter)

    const planet = screen.getByText(/alderaan/i);
    const incorrect = screen.queryByText(/tatooine/i);

    expect(planet).toBeInTheDocument();
    expect(incorrect).not.toBeInTheDocument();
  });
});
