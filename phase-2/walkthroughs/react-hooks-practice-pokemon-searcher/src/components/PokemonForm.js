import React, { useState } from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({ addPokemon }) {
  const initialState = {
    name: "",
    hp: "",
    frontUrl: "",
    backUrl: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, hp, frontUrl, backUrl } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        hp,
        sprites: { front: frontUrl, back: backUrl },
      }),
    })
      .then((r) => r.json())
      .then((newPokemon) => {
        addPokemon(newPokemon);
        setFormData(initialState);
      });
  };

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            value={name}
            fluid
            label="Name"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
          <Form.Input
            onChange={handleChange}
            value={hp}
            fluid
            label="hp"
            placeholder="hp"
            name="hp"
          />
          <Form.Input
            onChange={handleChange}
            value={frontUrl}
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
          />
          <Form.Input
            onChange={handleChange}
            value={backUrl}
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
