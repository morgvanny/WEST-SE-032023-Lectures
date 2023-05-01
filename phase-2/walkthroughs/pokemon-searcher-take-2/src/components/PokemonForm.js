import React, { useState } from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({ addPokemon }) {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   hp: "",
  //   front: "",
  //   back: "",
  // });

  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  // const { name, hp, front, back } = formData;

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPokemonData = {
      name,
      hp,
      sprites: { front, back },
    };

    addPokemon(newPokemonData);
    setName("");
    setHp("");
    setFront("");
    setBack("");
    // setFormData({
    //   name: "",
    //   hp: "",
    //   front: "",
    //   back: "",
    // });
  };

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input
            fluid
            label="hp"
            placeholder="hp"
            name="hp"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
