import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);

  const updatePizza = (data) => {
    fetch(`http://localhost:3001/pizzas/${data.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((updatedPizza) => {
        setPizzas(
          pizzas.map((p) => {
            if (p.id === updatedPizza.id) {
              return updatedPizza;
            } else {
              return p;
            }
          })
        );
        setFormData({
          id: "",
          topping: "",
          size: "",
          vegetarian: "",
        });
      });
  };

  const [formData, setFormData] = useState({
    id: "",
    topping: "",
    size: "",
    vegetarian: "",
  });

  const changeSelectedPizza = (id) => {
    const selectedPizza = pizzas.find((p) => p.id === id);
    setFormData({
      id: id,
      topping: selectedPizza.topping,
      size: selectedPizza.size,
      vegetarian: selectedPizza.vegetarian,
    });
  };

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((r) => r.json())
      .then((data) => {
        setPizzas(data);
      });
  }, []);

  return (
    <>
      <Header />
      <PizzaForm
        formData={formData}
        setFormData={setFormData}
        updatePizza={updatePizza}
      />
      <PizzaList pizzas={pizzas} changeSelectedPizza={changeSelectedPizza} />
    </>
  );
}

export default App;
