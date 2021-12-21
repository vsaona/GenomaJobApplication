import React from "react";
import axios from "axios";
import './Places.css';

function Places() {
  const [places, setPlaces] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:8089")
      .then((response) => setPlaces(response.data));
  }, []);

  function erase(name, location, type, score, visited) {
    axios.post("http://localhost:8089", {"action": "DELETE", "name": name, "location": location, "type": type, "score": score, "visited": visited})
      .then((response) => {
        var newPlaces = [];
        for(var i = 0; i < places.length; i++) {
          if(places[i].name !== name || places[i].location !== location || places[i].type !== type || places[i].score !== score || places[i].visited !== visited) {
            newPlaces.push(places[i]);
          }
        }
        setPlaces(newPlaces)
      });
  }

  return (
    <table className="places">
      <thead>
        <tr>
          <td>Name</td>
          <td>Location</td>
          <td>Type</td>
          <td>Score</td>
          <td>Visited</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
      {places.map((place) => (
        <tr className="place" key={place.id}>
          <td>{place.name}</td>
          <td>{place.location}</td>
          <td>{place.type}</td>
          <td>{place.score}</td>
          <td>{place.visited?
            <div>Yes</div>:
            <div>No</div>}
          </td>
          <td><button className="deleteButton" onClick = {()=>{erase(place.name, place.location, place.type, place.score, place.visited)}}>X</button></td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Places;