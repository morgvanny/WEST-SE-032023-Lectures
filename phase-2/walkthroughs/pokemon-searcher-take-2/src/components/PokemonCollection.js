import React from "react";
import PokemonCard from "./PokemonCard";
import { Card } from "semantic-ui-react";

function PokemonCollection({ pokemon }) {
  const pokemonCards = pokemon.map((pokemon) => {
    const { name, hp, sprites, id } = pokemon;
    return <PokemonCard key={id} name={name} hp={hp} sprites={sprites} />;
  });

  return <Card.Group itemsPerRow={6}>{pokemonCards}</Card.Group>;
}

export default PokemonCollection;
