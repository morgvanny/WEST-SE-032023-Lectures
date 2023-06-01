import React from "react";
import PokemonCard from "./PokemonCard";
import { Card } from "semantic-ui-react";

function PokemonCollection({ searchInput, allPokemon }) {
  const filteredPokemon = allPokemon.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  const pokemonCards = filteredPokemon.map((pokemon) => {
    return (
      <PokemonCard
        key={pokemon.id}
        name={pokemon.name}
        hp={pokemon.hp}
        front={pokemon.sprites.front}
        back={pokemon.sprites.back}
      />
    );
  });

  return <Card.Group itemsPerRow={6}>{pokemonCards}</Card.Group>;
}

export default PokemonCollection;
