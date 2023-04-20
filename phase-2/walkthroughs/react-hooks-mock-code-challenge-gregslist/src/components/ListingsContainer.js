import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import NewListing from "./NewListing";

function ListingsContainer({ search }) {
  const [listings, setListings] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const createListing = (formData) => {
    fetch("http://localhost:6001/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newListing) => {
        setListings([...listings, newListing]);
      });
  };

  const deleteListing = (id) => {
    fetch(`http://localhost:6001/listings/${id}`, { method: "DELETE" }).then(
      () => {
        const newListings = listings.filter((listing) => {
          return listing.id !== id;
        });
        setListings(newListings);
      }
    );
  };

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((r) => r.json())
      .then((listings) => setListings(listings));
  }, []);

  const filteredListings = listings.filter((listing) => {
    return listing.description.toLowerCase().includes(search.toLowerCase());
  });

  if (isSorted) {
    filteredListings.sort((a, b) => {
      return a.location.localeCompare(b.location);
    });
  }

  const listingCards = filteredListings.map((listing) => {
    return (
      <ListingCard
        key={listing.id}
        {...listing}
        deleteListing={deleteListing}
      />
    );
  });

  return (
    <main>
      <button onClick={() => setIsSorted(!isSorted)} type="button">
        {isSorted ? "Un-Sort" : "Sort"}
      </button>
      <ul className="cards">{listingCards}</ul>
      <NewListing createListing={createListing} />
    </main>
  );
}

export default ListingsContainer;
