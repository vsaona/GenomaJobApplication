import React from "react";
import axios from "axios";

function Places() {
  const [places, setPlaces] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:8089") //jsonplaceholder.typicode.com/posts")
      .then((response) => setPlaces(response.data));
  }, []);

  return (
    <table className="places">
      <tbody>
      {places.map((place) => (
        <tr className="place" key={place.id}>
          <td>{place.name}</td>
          <td>{place.location}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Places;