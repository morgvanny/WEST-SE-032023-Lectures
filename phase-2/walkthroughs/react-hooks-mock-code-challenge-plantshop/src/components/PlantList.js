import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants }) {
  const plantCards = plants.map((plant) => {
    const { id, name, image, price } = plant;
    return (
      <PlantCard key={id} id={id} name={name} image={image} price={price} />
    );
  });

  return <ul className="cards">{plantCards}</ul>;
}

export default PlantList;
