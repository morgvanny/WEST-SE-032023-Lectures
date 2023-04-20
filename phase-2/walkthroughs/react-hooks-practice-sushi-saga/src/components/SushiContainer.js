import React, { useState } from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";

function SushiContainer({ sushis, eatSushi }) {
  const [start, setStart] = useState(0);
  const numToDisplay = 4;

  const moreSushi = () => {
    setStart(start + numToDisplay);
  };

  const fourSushis = sushis.slice(start, start + numToDisplay);

  const sushiPlates = fourSushis.map((sushi) => {
    return (
      <Sushi
        isEaten={sushi.isEaten}
        id={sushi.id}
        eatSushi={eatSushi}
        key={sushi.id}
        name={sushi.name}
        price={sushi.price}
        img={sushi.img_url}
      />
    );
  });

  return (
    <div className="belt">
      {sushiPlates}
      <MoreButton moreSushi={moreSushi} />
    </div>
  );
}

export default SushiContainer;
