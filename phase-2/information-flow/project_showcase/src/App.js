import { useState } from "react";

import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const loadProjects = () => {
    fetch("http://localhost:4000/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
      });
  };

  // # Deliverable 1: Configure a <button> in our App
  // that will use json-server to fetch projects
  // and store them in state

  // - Add an onClick event listener to the "Load Projects"
  // button

  // - When the button is clicked, make a fetch
  // request to "http://localhost:4000/projects"
  // and set the `projects` state to the value
  // returned by the response

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <ProjectForm />
      <button onClick={loadProjects} type="button">
        Load Projects
      </button>
      <ProjectList projects={projects} />
    </div>
  );
};

export default App;
