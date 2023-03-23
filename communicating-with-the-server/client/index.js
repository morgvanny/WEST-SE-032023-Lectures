const booksDiv = document.querySelector("#books");

const showBook = (book) => {
  const bookDiv = document.createElement("div");
  bookDiv.className = "book";

  const title = document.createElement("h3");
  title.textContent = book.title;
  const authorP = document.createElement("p");
  authorP.textContent = `By: ${book.author}`;
  const bookImg = document.createElement("img");
  bookImg.src = book.imageUrl;

  const reviewsh4 = document.createElement("h4");
  reviewsh4.textContent = "Reviews";
  bookDiv.append(reviewsh4);
  const reviewsDiv = document.createElement("div");

  book.reviews.forEach((r) => {
    const rP = document.createElement("p");
    rP.textContent = r.content;
    reviewsDiv.append(rP);
  });
  bookDiv.append(reviewsDiv);

  const reviewForm = document.createElement("form");
  reviewForm.innerHTML = `
  <label for="review">Review:</label>
  <input name="review"/>
  <input type="submit" value="Add Review"/>
  `;
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rP = document.createElement("p");
    rP.textContent = e.target.review.value;
    reviewsDiv.append(rP);
    e.target.reset();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  const removeBook = (event) => {
    // inventory = inventory.filter((b) => book.id !== b.id);
    bookDiv.remove();
  };
  deleteBtn.addEventListener("click", removeBook);

  booksDiv.append(bookDiv);
  bookDiv.append(title, bookImg, authorP, reviewsDiv, deleteBtn);
};

fetch("http://localhost:3000/books")
  .then((r) => {
    if (!r.ok) {
      console.log(r.status);
    }
    return r.json();
  })
  .then((books) => {
    books.forEach(showBook);
  })
  .catch((error) => console.log("request failed"));

// async function init() {
//   try {
//     const response = await fetch("http://localhost:3000/books");
//     const books = await response.json();
//     books.forEach(showBook);
//   } catch (err) {
//     console.log(err);
//   }
// }

// init();

console.log("this logs after the fetch starts");
