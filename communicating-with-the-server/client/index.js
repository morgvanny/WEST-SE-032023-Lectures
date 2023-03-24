const booksUl = document.querySelector("#books");

const showBook = (book) => {
  const bookLi = document.createElement("li");
  bookLi.className = "list-li";

  const title = document.createElement("h3");
  title.textContent = book.title;
  const authorP = document.createElement("p");
  authorP.textContent = `By: ${book.author}`;
  const bookImg = document.createElement("img");
  bookImg.src = book.imageUrl;

  const reviewsh4 = document.createElement("h4");
  reviewsh4.textContent = "Reviews";

  const reviewsDiv = document.createElement("div");

  book.reviews.forEach((r) => {
    const rP = document.createElement("p");
    rP.textContent = r.content;
    reviewsDiv.append(rP);
  });
  bookLi.append(reviewsDiv);

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
    bookLi.remove();
  };
  deleteBtn.addEventListener("click", removeBook);

  booksUl.append(bookLi);
  bookLi.append(
    title,
    bookImg,
    authorP,
    reviewsh4,
    reviewsDiv,
    reviewForm,
    deleteBtn
  );
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
  .catch((error) => console.log(error));
