import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  // Variable to hold URL
  const url = "https://nyzendogsbackend.herokuapp.com"
  // State to hold dogs
  const [dogs, setDogs] = React.useState([])
  // Function to get dogs via API
  const getDogs = () => {
    fetch(url + "/dog/")
    .then(response => response.json())
    .then(data => {
      setDogs(data)
    })
  }
  // useEffect to do initial call of getDogs
  React.useEffect(() => {
    getDogs()
  }, [])
  // Empty dog
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }

    //selectedDog state, this will represent dog to be edited
    const [selectedDog, setSelectedDog] = React.useState(emptyDog)

  //handle create to create dogs
  const handleCreate = (newDog) => {
    fetch(url + "/dog", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newDog)
    }).then(response => {
      getDogs()
    })
  }

    //handleUpdate for when you use the update form
  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    }).then((response) => getDogs());
  };

      //Set the state when you select a dog to edit
  const selectDog = (dog) => {
    setSelectedDog(dog);
  };

  // Function to delete the dog
  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete",
    })
    .then((response) => getDogs())
  }


  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add Dog</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display selectDog={selectDog} {...rp} dogs={dogs} deleteDog={deleteDog} />} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
