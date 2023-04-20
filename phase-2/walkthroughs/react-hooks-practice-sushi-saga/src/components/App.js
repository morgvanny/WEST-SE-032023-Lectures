import React, { useState, useEffect } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";
const WALLET = 30;

function App() {
  const [sushis, setSushis] = useState([]);

  const plates = sushis.filter((sushi) => {
    return sushi.isEaten;
  });

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        setSushis(data);
      });
  }, []);

  let total = 0;
  plates.forEach((plate) => {
    total += plate.price;
  });

  const remaining = WALLET - total;

  const eatSushi = (id) => {
    const sushi = sushis.find((s) => s.id === id);
    if (sushi.price <= remaining) {
      setSushis(
        sushis.map((sushi) => {
          if (sushi.id === id) {
            return { ...sushi, isEaten: true };
          } else {
            return sushi;
          }
        })
      );
    }
  };

  return (
    <div className="app">
      <SushiContainer sushis={sushis} eatSushi={eatSushi} />
      <Table plates={plates} remaining={remaining} />
    </div>
  );
}

export default App;
