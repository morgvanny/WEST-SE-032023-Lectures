import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import projects from "./projects";
import { useState } from "react";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleLightDark = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? "" : "light"}`}>
      <Header isDarkMode={isDarkMode} toggleLightDark={toggleLightDark} />
      <ProjectForm />
      <ProjectList projects={projects} />
    </div>
  );
};

export default App;
