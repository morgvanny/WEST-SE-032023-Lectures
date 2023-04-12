import React from "react";

const Header = ({ isDarkMode, toggleLightDark }) => {
  // console.log(props);
  // let isDarkMode = true;
  // const isDarkMode = props.isDarkMode;
  // const setIsDarkMode = props.setIsDarkMode;

  // const { isDarkMode, setIsDarkMode } = props;
  // const [counter, setCounter] = useState(0);

  return (
    <header>
      <h1>
        <span className="logo">{"//"}</span>
        Project Showcase
      </h1>
      {/* {counter} */}
      <button
        type="button"
        onClick={() => {
          toggleLightDark();
          // setCounter(counter + 1);
        }}
      >
        {!isDarkMode ? "Dark" : "Light"} Mode
      </button>
    </header>
  );
};

export default Header;
