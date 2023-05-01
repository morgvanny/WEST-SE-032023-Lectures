import React, { useState } from "react";
import { Card } from "semantic-ui-react";

function PokemonCard({ name, hp, sprites }) {
  const [isShowFront, setIsShowFront] = useState(true);

  const handleClick = () => {
    setIsShowFront(!isShowFront);
  };

  return (
    <Card onClick={handleClick}>
      <div>
        <div className="image">
          <img src={isShowFront ? sprites.front : sprites.back} alt="oh no!" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {hp}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default PokemonCard;
