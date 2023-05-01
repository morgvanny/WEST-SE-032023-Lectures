import React, { useState, useEffect } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/pokemon")
      .then((r) => r.json())
      .then((data) => {
        setPokemon(data);
      });
  }, []);

  const addPokemon = (newPokemonData) => {
    fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPokemonData),
    })
      .then((r) => r.json())
      .then((data) => {
        setPokemon([...pokemon, data]);
      });
  };

  const filteredPokemon = pokemon.filter((p) => {
    return p.name.toLowerCase().includes(input.toLowerCase());
  });

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm addPokemon={addPokemon} />
      <br />
      <Search input={input} setInput={setInput} />
      <br />
      <PokemonCollection pokemon={filteredPokemon} />
    </Container>
  );
}

export default PokemonPage;
