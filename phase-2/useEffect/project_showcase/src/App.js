import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import Timer from "./components/Timer";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [num, setNum] = useState(0);

  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((projects) => setProjects(projects));
  }, []);

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

  const onToggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleClick = () => {
    setShowTimer(!showTimer);
  };

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <button type="button" onClick={handleClick}>
        {showTimer ? "Hide Timer" : "Show Timer"}
      </button>
      {showTimer ? <Timer num={num} setNum={setNum} /> : null}
      <Header isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
      <ProjectForm addNewProject={addNewProject} />
      <ProjectList projects={projects} />
    </div>
  );
};

export default App;
