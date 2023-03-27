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
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviews: [...book.reviews, { content: e.target.review.value }],
      }),
    });
    e.target.reset();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  const removeBook = (event) => {
    // inventory = inventory.filter((b) => book.id !== b.id);
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
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

const addBook = (e) => {
  e.preventDefault();
  const newBook = {
    title: e.target.title.value,
    author: e.target.author.value,
    imageUrl: e.target.imageUrl.value,
    reviews: [],
  };

  // showBook(newBook);
  fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  })
    .then((r) => r.json())
    .then((data) => {
      showBook(data);
      e.target.reset();
    });
};

document.querySelector("#newBook").addEventListener("submit", addBook);
//  {

//     "title": "Cracking the Coding Interview",
//     "author": "Gayle Laakmann McDowell",
//     "reviews": [
//       {
//         "userID": 99,
//         "content":
//           "One of the most helpful books for taking on the tech interview"
//       },
//       {
//         "userID": 20,
//         "content": "Great but I just wish it was in JavaScript instead of Java"
//       }
//     ],
//     "imageUrl":
//       "https://images-na.ssl-images-amazon.com/images/I/41oYsXjLvZL._SY344_BO1,204,203,200_.jpg"
//   }
