import React from "react";
import axios from "axios";
import './Places.css';

function Places() {
  const [places, setPlaces] = React.useState([]);
  const [orderedBy, setOrder] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:8089")
      .then((response) => setPlaces(response.data));
  }, []);

  function erase(name, location, type, score, visited) {
    axios.post("http://localhost:8089", {
      "action": "DELETE", "name": name, "location": location, "type": type, "score": score, "visited": visited
    }).then((response) => {
      var newPlaces = [];
      for(var i = 0; i < places.length; i++) {
        if(places[i].name !== name || places[i].location !== location || places[i].type !== type || places[i].score !== score || places[i].visited !== visited) {
          newPlaces.push(places[i]);
        }
      }
      setPlaces(newPlaces)
    });
  }

  function order(criteria) {
    if(orderedBy === criteria) {
      var newPlaces = places.sort((a,b) => a[criteria] < b[criteria] ? 1 : -1);
      setPlaces(newPlaces);
      setOrder("none");
      console.log(newPlaces);
      console.log(orderedBy);
    } else {
      var newPlaces = places.sort((a,b) => a[criteria] < b[criteria] ? -1 : 1);
      setPlaces(newPlaces);
      setOrder(criteria);
      console.log(newPlaces);
      console.log(orderedBy);
    }
  }

  return (
    <table className="places">
      <thead>
        <tr>
          <td>Nombre <button onClick = {()=>{order("name")}}>▼</button></td>
          <td>Ubicación <button onClick = {()=>{order("location")}}>▼</button></td>
          <td>Tipo <button onClick = {()=>{order("type")}}>▼</button></td>
          <td>Calificación <button onClick = {()=>{order("score")}}>▼</button></td>
          <td>Visitado <button onClick = {()=>{order("visited")}}>▼</button></td>
          <td>Borrar</td>
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
            <div>Sí</div>:
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