import Header from './components/Header';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import './styles/App.css';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
