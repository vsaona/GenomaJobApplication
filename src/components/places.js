import React from "react";
import axios from "axios";
import './Places.css';

function Places(props) {
  
  const [orderedBy, setOrder] = React.useState("none");
  const [filtersAreVisible, setFiltersVisibility] = React.useState(false);
  const [nameFilter, filterByName] = React.useState("");
  const [locationFilter, filterByLocation] = React.useState("");
  const [visitedAreVisible, visitedShouldBeVisible] = React.useState(true);

  React.useEffect(() => {
    axios.get("http://localhost:8089")
      .then((response) => props.setPlaces(response.data));
  }, []);

  function filterUnvisitedPlaces() {
    axios.post("http://localhost:8089", {"action": "FILTER"}
    ).then((response) => props.setPlaces(response.data));
      visitedShouldBeVisible(false);
  }

  function refreshPlaces() {
    axios.get("http://localhost:8089"
    ).then((response) => props.setPlaces(response.data));
    visitedShouldBeVisible(true);
  }

  /*elem.addEventListener('update', function (e) {
    if(visitedAreVisible) {
      axios.get("http://localhost:8089"
      ).then((response) => props.setPlaces(response.data));
    } else {
      axios.post("http://localhost:8089", {"action": "FILTER"}
      ).then((response) => props.setPlaces(response.data));
    }
  }, false);
*/
  function erase(name, location, type, score, visited) {
    axios.post("http://localhost:8089", {
      "action": "DELETE", "name": name, "location": location, "type": type, "score": score, "visited": visited
    }).then((response) => {
      var newPlaces = [];
      for(var i = 0; i < props.places.length; i++) {
        if(props.places[i].name !== name || props.places[i].location !== location || props.places[i].type !== type || props.places[i].score !== score || props.places[i].visited !== visited) {
          newPlaces.push(props.places[i]);
        }
      }
      props.setPlaces(newPlaces)
    });
  }

  function order(criteria) {
    var newPlaces;
    if(orderedBy === criteria) {
      newPlaces = props.places.sort((a,b) => a[criteria] < b[criteria] ? 1 : -1);
      props.setPlaces(newPlaces);
      setOrder("none");
    } else {
      newPlaces = props.places.sort((a,b) => a[criteria] < b[criteria] ? -1 : 1);
      props.setPlaces(newPlaces);
      setOrder(criteria);
    }
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
      {props.places.map((place) => (
        <tr className={"place" + ((filtersAreVisible && (!place["name"].includes(nameFilter) || !place["location"].includes(locationFilter)))? " invisible" :" visible")} key={place.id}>
          <td>{place.name}</td>
          <td>{place.location}</td>
          <td>{place.type}</td>
          <td>{place.score}</td>
          <td>{place.visited?
            <div>Sí</div>:
            <div>No</div>}
          </td>
          <td><button className="deleteButton btn btn-danger" onClick = {()=>{erase(place.name, place.location, place.type, place.score, place.visited)}}>X</button></td>
        </tr>
      ))}
      </tbody>
    </table>
    <button className = {"btn btn-secondary " + (filtersAreVisible? "invisible" : "visible")} onClick={()=>{setFiltersVisibility(!filtersAreVisible)}}> Filter data</button>
    <h3 className = {filtersAreVisible? "visible" : "invisible"} > Filtros </h3>
    <div id = "filters" className = {filtersAreVisible? "visible" : "invisible"}>
      <div><label htmlFor="nameFilterInput">Nombre </label><input id = "nameFilterInput" onChange={(e)=>{filterByName(e.target.value)}}></input></div>
      <div><label htmlFor="locationFilterInput">Ubicación </label><input id = "locationFilterInput" onChange={(e)=>{filterByLocation(e.target.value)}}></input></div>
      <div><button className={"btn btn-secondary" + (visitedAreVisible?"":" invisible")} id="hideVisitedPlaces" onClick={filterUnvisitedPlaces}> Ocultar lugares aún no visitados </button></div>
      <div><button className={"btn btn-secondary" + (visitedAreVisible?" invisible":"")} id="showVisitedPlaces" onClick={refreshPlaces}> Mostrar lugares aún no visitados </button></div>
    </div>
    </div>
  );
}

export default Places;