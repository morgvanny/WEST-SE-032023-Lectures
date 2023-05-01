import React from "react";

function Header({ input, setInput }) {
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div id="toy-header">
      <img
        src="https://fontmeme.com/permalink/180719/67429e6afec53d21d64643101c43f029.png"
        alt="toy header"
      />
      <input value={input} onChange={handleChange} name="search" id="search" />
    </div>
  );
}

export default Header;
