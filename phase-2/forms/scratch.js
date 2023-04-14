const dogs = [
  { name: "Martin", age: 8, breed: "toy poodle/bichon frise" },
  { name: "Maggie", age: 10, breed: "australian shepherd" },
  { name: "Luna", age: 3, breed: "chi" },
];

const molly = {
  name: "Molly",
  age: 16,
  breed: "t",
};

const newMolly = { ...molly, breed: "Toy Poodle" };

const newDogs = [newMolly, ...dogs, ...dogs];

function updateMolly(keyName, value) {
  molly[keyName] = value;
}

updateMolly("breed", "Toy Poodle");
updateMolly("age", 10);
