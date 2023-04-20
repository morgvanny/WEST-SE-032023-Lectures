import React from "react";

function Sushi({ name, img, price, id, eatSushi, isEaten }) {
  const handleClick = () => {
    eatSushi(id);
  };

  return (
    <div className="sushi">
      <div className="plate" onClick={handleClick}>
        {/* Tell me if this sushi has been eaten! */}
        {isEaten ? null : <img src={img} alt={name} width="100%" />}
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  );
}

export default Sushi;
