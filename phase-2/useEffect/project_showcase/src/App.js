import { useState } from "react";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

const App = () => {
  // Deliverable 2: Implement useEffect in App component
  // to load projects

  // Import the `useEffect` hook from the React library

  // Invoke `useEffect` and make a `GET` request using
  // the `fetch` method

  // Update `projects` state upon successful response
  // from the server

  // Deliverable 3: Demonstrate the order of operations
  // between rendering a component and running the side
  // effect

  // Place a console.log() inside the `App` component as
  // well as the `useEffect` method

  // Open up the devtools to observe when each phase of
  // the component will occur

  const [projects, setProjects] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const addNewProject = (project) => {
    fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
      .then((r) => r.json())
      .then((p) => {
        setProjects([...projects, p]);
      });
  };

  const handleClick = () => {
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((projects) => setProjects(projects));
  };

  const onToggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
      <ProjectForm addNewProject={addNewProject} />
      <button onClick={handleClick}>Load Projects</button>
      <ProjectList projects={projects} />
    </div>
  );
};

export default App;
