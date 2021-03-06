import React, {useState} from 'react';
import './App.css';
import Places from "./components/places";
import axios from "axios";
/* 
 * Done as suggested in:
 * https://www.freecodecamp.org/news/how-to-build-a-react-project-with-create-react-app-in-10-steps/
 * and in:
 * https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state
 */

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [score, setScore] = useState(2);
  const [visited, setVisited] = useState(false);
  const [places, setPlaces] = React.useState([]);

  function addPlace() {
    if(!name) {
      alert("Debe ingresar el nombre del local");
      return;
    }
    if(!location) {
      alert("Debe ingresar la ubicación del local");
      return;
    }

    axios.post("http://localhost:8089", {"action": "ADD",
      "name": name, "location": location, "type": type, "score":score, "visited": visited
    }).then(()=>{
      alert("Lugar guardado");
      axios.get("http://localhost:8089"
      ).then((response) => setPlaces(response.data));
    }).catch( (reason) => {
      console.log(reason);
      alert("Error al guardar el lugar");
    });
  }

  function handleNameChange(e) {
    setName(e.target.value)
  }
  function handleLocationChange(e) {
    setLocation(e.target.value)
  }
  function handleTypeChange(e) {
    setType(e.target.value)
  }
  function handleScoreChange(e) {
    setScore(e.target.value)
  }
  function handleVisitedChange(e) {
    setVisited(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="tocino1.jpg" className="App-logo" alt="logo" />
        <h2>
          Lista de todos los lugares
        </h2>
        <Places places = {places} setPlaces = {setPlaces}/>
        

        <div className = "card">
          <h2>
            Añadir un nuevo lugar
          </h2>

          <label htmlFor="name">Nombre</label>
          <input id = "name" onChange = {handleNameChange} pattern = ".*" name="name"></input>
          <label htmlFor="location">Ubicación</label>
          <input id = "location" onChange = {handleLocationChange} name="location"></input>
          <label htmlFor="type">Tipo</label>
          <input id = "type" onChange = {handleTypeChange} name="type"></input>
          <label htmlFor="score">Calificación</label>
          <input id = "score" type = "range" max = {5} min = {1} defaultValue={2} onChange = {handleScoreChange} name="score"></input>
          <label htmlFor="visited">Visitado</label>
          <input type = "checkbox" onChange = {handleVisitedChange} id = "visited" name="visited"></input>

          <button className = "btn btn-primary" onClick={addPlace}> Añadir lugar </button>
        </div>
      </header>
    </div>
  );
}

export default App;
