let allDogs;
const dogBar = document.querySelector("#dog-bar");

const toggleIsGoodDog = (dog, button) => {
  dog.isGoodDog = !dog.isGoodDog;
  button.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog),
  });
};

const showDetails = (dog) => {
  const img = document.createElement("img");
  img.src = dog.image;
  img.alt = dog.name;
  const name = document.createElement("h2");
  name.textContent = dog.name;
  const button = document.createElement("button");
  button.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";

  button.addEventListener("click", () => {
    toggleIsGoodDog(dog, button);
  });

  const infoDiv = document.querySelector("#dog-info");
  infoDiv.innerHTML = "";
  infoDiv.append(img, name, button);
};

const renderSpans = (dogs) => {
  dogs.forEach((dog) => {
    console.log(dog.name);
    const span = document.createElement("span");
    span.textContent = dog.name;
    dogBar.append(span);

    span.addEventListener("click", () => showDetails(dog));
  });
};

fetch("http://localhost:3000/pups")
  .then((r) => r.json())
  .then((dogs) => {
    allDogs = dogs;
    renderSpans(allDogs);
  });

let filterOn = false;
const filterButton = document.querySelector("#good-dog-filter");

filterButton.addEventListener("click", () => {
  filterOn = !filterOn;
  filterButton.textContent = `Filter good dogs: ${filterOn ? "ON" : "OFF"}`;
  dogBar.innerHTML = "";
  if (filterOn) {
    renderSpans(allDogs.filter((d) => d.isGoodDog));
  } else {
    renderSpans(allDogs);
  }
});
