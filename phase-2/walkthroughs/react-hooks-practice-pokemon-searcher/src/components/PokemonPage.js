import React, { useState, useEffect } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [searchInput, setSearchInput] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);

  const addPokemon = (pokemon) => {
    setAllPokemon([...allPokemon, pokemon]);
  };

  useEffect(() => {
    fetch("http://localhost:3001/pokemon")
      .then((r) => r.json())
      .then((data) => setAllPokemon(data));
  }, []);

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm addPokemon={addPokemon} />
      <br />
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <br />
      <PokemonCollection allPokemon={allPokemon} searchInput={searchInput} />
    </Container>
  );
}

export default PokemonPage;
