import React from "react";

function ToyCard({ name, image, likes, id, removeToy, addLike }) {
  const handleRemoveClick = () => {
    removeToy(id);
  };

  const handleLikeClick = () => {
    addLike(id, likes);
  };
  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button onClick={handleLikeClick} className="like-btn">
        Like {"<3"}
      </button>
      <button onClick={handleRemoveClick} className="del-btn">
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
