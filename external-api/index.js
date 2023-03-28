console.log("js loaded");

const resultsDiv = document.querySelector(".results");

// document.querySelector("form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   fetch(`https://api.tvmaze.com/search/shows?q=${e.target.query.value}`)
//     .then((r) => r.json())
//     .then((data) => {
//       resultsDiv.innerHTML = "";
//       data.forEach((result) => {
//         displayShow(result.show);
//       });
//     });
// });

// const displayShow = (show) => {
//   console.log(show);
//   const showDiv = document.createElement("div");
//   showDiv.className = "show";
//   const h2 = document.createElement("h2");
//   h2.textContent = show.name;

//   showDiv.append(h2);
//   if (show.image) {
//     const img = document.createElement("img");
//     img.src = show.image.medium;
//     showDiv.append(img);
//   } else {
//     const p = document.createElement("p");
//     p.textContent = "No image for this show";
//     showDiv.append(p);
//   }

//   resultsDiv.append(showDiv);
// };

const displayBook = (book) => {
  const bookDiv = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = book.volumeInfo.title;
  bookDiv.append(h2);
  resultsDiv.append(bookDiv);
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${e.target.query.value}&key=${googleKey}`
  )
    .then((r) => r.json())
    .then((data) => {
      resultsDiv.innerHTML = "";
      console.log(data);
      data.items.forEach((book) => {
        displayBook(book);
      });
    });
});
