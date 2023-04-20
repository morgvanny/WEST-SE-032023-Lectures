import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);

  const [input, setInput] = useState("");

  const searchedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(input.toLowerCase());
  });

  const addPlant = (formData) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        setPlants([...plants, newPlant]);
      });
  };

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((plants) => {
        setPlants(plants);
      });
  }, []);

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search input={input} setInput={setInput} />
      <PlantList plants={searchedPlants} />
    </main>
  );
}

export default PlantPage;
