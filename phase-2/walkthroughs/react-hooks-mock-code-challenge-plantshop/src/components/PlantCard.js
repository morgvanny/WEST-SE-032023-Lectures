import React, { useState } from "react";

function PlantCard({ id, name, image, price }) {
  const [isInStock, setIsInStock] = useState(true);

  const handleClick = (e) => {
    setIsInStock(false);
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button onClick={handleClick} className="primary">
          In Stock
        </button>
      ) : (
        <button disabled type="button">
          Out of Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;
