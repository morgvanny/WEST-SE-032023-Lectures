import React, { useState, useEffect } from "react";
import Pizza from "./Pizza";

function PizzaList({ pizzas, changeSelectedPizza }) {
  const pizzaRows = pizzas.map((pizza) => {
    const { topping, size, vegetarian, id } = pizza;

    return (
      <Pizza
        changeSelectedPizza={changeSelectedPizza}
        key={id}
        topping={topping}
        size={size}
        vegetarian={vegetarian}
        id={id}
      />
    );
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Topping</th>
          <th scope="col">Size</th>
          <th scope="col">Vegetarian?</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>

      <tbody>{pizzaRows}</tbody>
    </table>
  );
}

export default PizzaList;
