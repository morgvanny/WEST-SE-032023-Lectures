import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, removeToy, addLike }) {
  const toyCards = toys.map((toy) => {
    const { id, name, image, likes } = toy;
    return (
      <ToyCard
        id={id}
        name={name}
        image={image}
        likes={likes}
        removeToy={removeToy}
        addLike={addLike}
      />
    );
  });

  return <div id="toy-collection">{toyCards}</div>;
}

export default ToyContainer;
