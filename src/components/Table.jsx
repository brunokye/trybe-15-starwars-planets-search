import useFetch from '../hooks/useFetch';
import '../styles/table.css';

export default function Table() {
  const { isLoading, planets } = useFetch();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { isLoading ? <tr><td>Loading...</td></tr> : planets.map(({ name,
          rotation_period: rotation,
          orbital_period: orbital,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water: surface,
          population,
          films,
          created,
          edited,
          url }) => (
          (
            <tr key={ name }>
              <td>{ name }</td>
              <td>{ rotation }</td>
              <td>{ orbital }</td>
              <td>{ diameter }</td>
              <td>{ climate }</td>
              <td>{ gravity }</td>
              <td>{ terrain }</td>
              <td>{ surface }</td>
              <td>{ population }</td>
              <td>{ films }</td>
              <td>{ created }</td>
              <td>{ edited }</td>
              <td>{ url }</td>
            </tr>
          )
        ))}
      </tbody>
    </table>
  );
}
