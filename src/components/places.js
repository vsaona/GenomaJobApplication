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

  function purelyRefreshPlaces() {
    axios.get("http://localhost:8089"
    ).then((response) => {
      props.setPlaces(response.data)}
      );
  }

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

  function editThis(e) {
    var index = e.target.id.match(/(place_\d+)/)[0];
    var place = props.places.find(element => element.id === index);
    var field = e.target.id.match(/place_\d+_(\w+)/)[1];
    var newValue = window.prompt('Ingrese nuevo valor:', e.target.innerText);
    if(field === "score" && !newValue.match(/^\d+$/)) { // Don't why thins doesn't work
      alert("¡La calificación debe ser un número!");
      return;
    }
    axios.post("http://localhost:8089", {
      "action": "MODIFY",
      "oldName": place.name, "oldLocation": place.location, "oldType": place.type, "oldScore": place.score, "oldVisited": place.visited,
      "name": ((field==="name")?newValue:place.name), "location": (field==="location"?newValue:place.location),
      "type": (field==="type"?newValue:place.type), "score": (field==="score"?newValue:place.score), "visited": (field==="visited"?!place.visited:place.visited)}
    ).then(() => {
      purelyRefreshPlaces();
    });
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
          <td id={place.id + "_name"} onDoubleClick={editThis}>{place.name}</td>
          <td id={place.id + "_location"} onDoubleClick={editThis}>{place.location}</td>
          <td id={place.id + "_type"} onDoubleClick={editThis}>{place.type}</td>
          <td id={place.id + "_score"} onDoubleClick={editThis}>{place.score}</td>
          <td id={place.id + "_visited"} onDoubleClick={editThis}>{place.visited?
            <div id={place.id + "_visited-yes"}>Sí</div>:
            <div id={place.id + "_visited-no"}>No</div>}
          </td>
          <td><button className="deleteButton btn btn-danger" onClick = {()=>{erase(place.name, place.location, place.type, place.score, place.visited)}}>X</button></td>
        </tr>
      ))}
      </tbody>
    </table>
    <button className = {"btn btn-secondary " + (filtersAreVisible? "invisible" : "visible")} onClick={()=>{setFiltersVisibility(!filtersAreVisible)}}> Filtrar datos</button>
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