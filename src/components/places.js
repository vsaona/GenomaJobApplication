import React from "react";
import axios from "axios";
import './Places.css';

function Places() {
  const [places, setPlaces] = React.useState([]);
  const [orderedBy, setOrder] = React.useState("none");
  const [filtersAreVisible, setFiltersVisibility] = React.useState(false);
  const [nameFilter, filterByName] = React.useState("");
  const [locationFilter, filterByLocation] = React.useState("");

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

  function filter(criteria, value) {
    console.log("achu");
    var newPlaces = [];
    for(var i = 0; i < places.length; i++) {
      console.log("chuuuu");
      if(typeof places[i][criteria] == typeof "arbitrary string" && places[i][criteria].includes(value)) {
        console.log("dischu");
        newPlaces.push(places[i]);
      } else if (typeof places[i][criteria] == typeof 6  && places[i][criteria] > value) {
        newPlaces.push(places[i]);
      } else if (typeof places[i][criteria] == typeof true  && places[i][criteria]) {
        newPlaces.push(places[i]);
      }
    }
    setPlaces(newPlaces);
  }

  return (
    <div><table className="places">
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
        <tr className={"place" + ((filtersAreVisible && !place["name"].includes(nameFilter) || !place["location"].includes(locationFilter))? " invisible" :" visible")} key={place.id}>
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
    <button className = {filtersAreVisible? "invisible" : "visible"} onClick={()=>{setFiltersVisibility(!filtersAreVisible)}}> Filter data</button>
    <h3 className = {filtersAreVisible? "visible" : "invisible"} > Filtros </h3>
    <div id = "filters" className = {filtersAreVisible? "visible" : "invisible"}>
      <div><label htmlFor="nameFilterInput">Nombre </label><input id = "nameFilterInput" onChange={(e)=>{filterByName(e.target.value)}}></input></div>
      <div><label htmlFor="locationFilterInput">Ubicación </label><input id = "locationFilterInput" onChange={(e)=>{filterByLocation(e.target.value)}}></input></div>
      <div><button id="onlyVisitedPlaces"> Ver lugares visitados </button></div>
    </div>
    </div>
  );
}

export default Places;