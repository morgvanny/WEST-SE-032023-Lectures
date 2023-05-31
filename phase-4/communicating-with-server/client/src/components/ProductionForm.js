import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function ProductionForm({ addProduction }) {
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  const [newProduction, setNewProduction] = useState({
    title: "",
    genre: "",
    budget: "",
    image: "",
    director: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewProduction({ ...newProduction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/productions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduction),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          addProduction(data);
          history.push("/");
        });
      } else {
        r.json().then((data) => setErrors(data.errors));
      }
    });
  };

  const { title, genre, budget, image, director, description } = newProduction;
  return (
    <div className="App">
      {errors.length > 0 ? (
        <ul>
          {errors.map((e) => {
            return <li>{e}</li>;
          })}
        </ul>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <label>Title </label>
        <input type="text" name="title" value={title} onChange={handleChange} />

        <label> Genre</label>
        <input type="text" name="genre" value={genre} onChange={handleChange} />

        <label>Budget</label>
        <input
          type="number"
          name="budget"
          value={budget}
          onChange={handleChange}
        />

        <label>Image</label>
        <input type="text" name="image" value={image} onChange={handleChange} />

        <label>Director</label>
        <input
          type="text"
          name="director"
          value={director}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          type="text"
          rows="4"
          cols="50"
          name="description"
          value={description}
          onChange={handleChange}
        />

        <input type="submit" />
      </Form>
    </div>
  );
}

export default ProductionForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
  font-family: Arial;
  font-size: 30px;
  input[type="submit"] {
    background-color: #42ddf5;
    color: white;
    height: 40px;
    font-family: Arial;
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
