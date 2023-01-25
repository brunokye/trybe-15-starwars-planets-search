import { render, screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockData from './mockData';

describe('Verifica a aplicação por completo:', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    })
  })

  afterEach (() => {
    jest.clearAllMocks();
  })

  it('1 - Testa os elementos da tela.', () => {
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

  it('2 - Testa o filtro por nome.', async () => {
    await act (() => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    });

    const name = screen.getByTestId('name-filter');
    
    userEvent.type(name, 'tato');
    
    const planet = screen.getByRole('cell', { name: /tatooine/i });
    const hiddenElement = screen.queryByRole('cell', { name: /alderaan/i });

    expect(planet).toBeInTheDocument();
    expect(hiddenElement).not.toBeInTheDocument();
  });

  it('3 - Testa um único filtro numérico.', async () => {
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

    const planet = screen.getByRole('cell', { name: /alderaan/i });
    const hiddenElement = screen.queryByRole('cell', { name: /tatooine/i });

    expect(planet).toBeInTheDocument();
    expect(hiddenElement).not.toBeInTheDocument();
  });

  it('4 - Testa adicionar e remover um único filtro.', async () => {
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
    
    const planet = screen.getByRole('cell', { name: /dagobah/i });
    expect(planet).toBeInTheDocument();

    userEvent.selectOptions(tag, 'population');
    userEvent.selectOptions(operator, 'menor que');
    userEvent.clear(number);
    userEvent.type(number, '6000000')
    userEvent.click(applyFilter)

    const hiddenElement = screen.queryByRole('cell', { name: /dagobah/i });
    expect(hiddenElement).not.toBeInTheDocument();

    const view = screen.getByText(/population \| menor que \| 6000000/i); 
    const removeFilter = within(view).getByRole('button', { name: /🗑/i} );
    userEvent.click(removeFilter);
    
    const oldHiddenElement = screen.getByRole('cell', { name: /dagobah/i });
    expect(oldHiddenElement).toBeInTheDocument();
  });

  it('5 - Testa adicionar diversos filtros e remover apenas um.', async () => {
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
    userEvent.selectOptions(operator, 'menor que');
    userEvent.clear(number);
    userEvent.type(number, '6000000')
    userEvent.click(applyFilter)

    userEvent.selectOptions(tag, 'surface_water');
    userEvent.selectOptions(operator, 'igual a');
    userEvent.clear(number);
    userEvent.type(number, '8')
    userEvent.click(applyFilter)

    const planet = screen.getByRole('cell', { name: /yavin iv/i });
    expect(planet).toBeInTheDocument();

    userEvent.selectOptions(tag, 'rotation_period');
    userEvent.selectOptions(operator, 'igual a');
    userEvent.clear(number);
    userEvent.type(number, '12')
    userEvent.click(applyFilter)

    const hiddenElement = screen.queryByRole('cell', { name: /yavin iv/i });
    expect(hiddenElement).not.toBeInTheDocument();

    const view = screen.getByText(/rotation_period \| igual a \| 12/i); 
    const removeFilter = within(view).getByRole('button', { name: /🗑/i} );
    userEvent.click(removeFilter);
    
    const oldHiddenElement = screen.getByRole('cell', { name: /yavin iv/i });
    expect(oldHiddenElement).toBeInTheDocument();
  });

  it('6 - Testa múltiplos filtros numérico.', async () => {
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
    
    userEvent.selectOptions(tag, 'orbital_period');
    userEvent.selectOptions(operator, 'maior que');
    userEvent.clear(number);
    userEvent.type(number, '364')
    userEvent.click(applyFilter)

    userEvent.selectOptions(tag, 'diameter');
    userEvent.selectOptions(operator, 'menor que');
    userEvent.clear(number);
    userEvent.type(number, '12240')
    userEvent.click(applyFilter)

    userEvent.selectOptions(tag, 'surface_water');
    userEvent.selectOptions(operator, 'igual a');
    userEvent.clear(number);
    userEvent.type(number, '100')
    userEvent.click(applyFilter)

    const planet = screen.getByRole('cell', { name: /hoth/i });
    const hiddenElement = screen.queryByRole('cell', { name: /endor/i });

    expect(planet).toBeInTheDocument();
    expect(hiddenElement).not.toBeInTheDocument();
  });

  it('7 - Testa limpar todos os filtros.', async () => {
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
    userEvent.selectOptions(operator, 'menor que');
    userEvent.clear(number);
    userEvent.type(number, '1000000000000')
    userEvent.click(applyFilter)

    userEvent.selectOptions(tag, 'orbital_period');
    userEvent.selectOptions(operator, 'menor que');
    userEvent.clear(number);
    userEvent.type(number, '5110')
    userEvent.click(applyFilter)

    userEvent.selectOptions(tag, 'diameter');
    userEvent.selectOptions(operator, 'menor que');
    userEvent.clear(number);
    userEvent.type(number, '19720')
    userEvent.click(applyFilter)

    userEvent.selectOptions(tag, 'rotation_period');
    userEvent.selectOptions(operator, 'menor que');
    userEvent.clear(number);
    userEvent.type(number, '24')
    userEvent.click(applyFilter)

    userEvent.selectOptions(tag, 'surface_water');
    userEvent.selectOptions(operator, 'igual a');
    userEvent.clear(number);
    userEvent.type(number, '8')
    userEvent.click(applyFilter)

    const planet = screen.getByRole('cell', { name: /endor/i });
    const hiddenElement = screen.queryByRole('cell', { name: /coruscant/i });

    expect(planet).toBeInTheDocument();
    expect(hiddenElement).not.toBeInTheDocument();
    
    const clearFilters = screen.getByRole('button', {  name: /remover filtros/i });
    userEvent.click(clearFilters);

    const oldHiddenElement = screen.getByRole('cell', { name: /coruscant/i });
    expect(oldHiddenElement).toBeInTheDocument();
  });
});
