let currentDog;
let currentName;
let currentBreed;
let currentSex;

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentName.textContent = form.name.value;
  currentBreed.textContent = form.breed.value;
  currentSex.textContent = form.sex.value;
  currentDog.name = form.name.value;
  currentDog.breed = form.breed.value;
  currentDog.sex = form.sex.value;
  fetch(`http://localhost:3000/dogs/${currentDog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentDog),
  });
});

fetch("http://localhost:3000/dogs")
  .then((r) => r.json())
  .then((dogs) => {
    const body = document.querySelector("#table-body");
    dogs.forEach((dog) => {
      const row = document.createElement("tr");
      const name = document.createElement("td");
      name.textContent = dog.name;
      const breed = document.createElement("td");
      breed.textContent = dog.breed;
      const sex = document.createElement("td");
      sex.textContent = dog.sex;
      const edit = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      edit.append(editBtn);
      row.append(name, breed, sex, edit);
      body.append(row);

      editBtn.addEventListener("click", () => {
        form.name.value = dog.name;
        form.breed.value = dog.breed;
        form.sex.value = dog.sex;
        currentDog = dog;
        currentName = name;
        currentBreed = breed;
        currentSex = sex;
      });
    });
  });
