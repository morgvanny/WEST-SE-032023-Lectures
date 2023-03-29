// write your code here
const detailImg = document.querySelector("#ramen-detail img");
const detailName = document.querySelector("#ramen-detail h2");
const detailRestaurant = document.querySelector("#ramen-detail h3");
const detailRating = document.querySelector("#rating-display");
const detailComment = document.querySelector("#comment-display");

let currentRamen;

const displayDetails = (ramen) => {
  currentRamen = ramen;
  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

const addToMenu = (ramen) => {
  const div = document.createElement("div");
  const image = document.createElement("img");
  image.src = ramen.image;
  image.alt = ramen.name;
  image.addEventListener("click", () => displayDetails(ramen));
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/ramens/${ramen.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    div.remove();
  });
  div.append(image, deleteBtn);
  document.querySelector("#ramen-menu").append(div);
};

fetch("http://localhost:3000/ramens")
  .then((r) => r.json())
  .then((ramens) => {
    ramens.forEach((ramen) => {
      addToMenu(ramen);
    });
    displayDetails(ramens[0]);
  });

document.querySelector("#new-ramen").addEventListener("submit", (e) => {
  e.preventDefault();
  const newRamen = {
    name: e.target.name.value,
    image: e.target.image.value,
    restaurant: e.target.restaurant.value,
    rating: e.target.rating.value,
    comment: e.target.comment.value,
  };
  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRamen),
  })
    .then((r) => r.json())
    .then((ramen) => {
      addToMenu(ramen);
      e.target.reset();
    });
});

document.querySelector("#edit-ramen").addEventListener("submit", (e) => {
  e.preventDefault();
  currentRamen.comment = e.target.comment.value;
  currentRamen.rating = e.target.rating.value;

  fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      comment: currentRamen.comment,
      rating: currentRamen.rating,
    }),
  });

  detailComment.textContent = currentRamen.comment;
  detailRating.textContent = currentRamen.rating;

  e.target.reset();
});
