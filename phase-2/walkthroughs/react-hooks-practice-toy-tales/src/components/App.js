import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [input, setInput] = useState("");
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => {
        setToys(data);
      });
  }, []);

  const addLike = (id, likes) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((r) => r.json())
      .then((data) => {
        setToys(
          toys.map((toy) => {
            if (toy.id !== id) {
              return toy;
            } else {
              return data;
            }
          })
        );
      });
  };

  const removeToy = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys(
        toys.filter((toy) => {
          return toy.id !== id;
        })
      );
    });
  };

  const addToy = (formData) => {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        image: formData.image,
        likes: 0,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setToys([...toys, data]);
      });
  };

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const filteredToys = toys.filter((toy) => {
    return toy.name.toLowerCase().includes(input.toLowerCase());
  });

  return (
    <>
      <Header input={input} setInput={setInput} />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={filteredToys}
        removeToy={removeToy}
        addLike={addLike}
      />
    </>
  );
}

export default App;
