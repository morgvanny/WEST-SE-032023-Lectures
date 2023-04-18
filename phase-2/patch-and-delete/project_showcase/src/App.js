import { useEffect, useState } from "react";

import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import ProjectEditForm from "./components/ProjectEditForm";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(null);

  const deleteProject = (id) => {
    fetch(`http://localhost:4000/projects/${id}`, {
      method: "DELETE",
    });
    setProjects(
      projects.filter((project) => {
        return project.id !== id;
      })
    );
  };

  const addClap = (id) => {
    const currentClapCount = projects.find(
      (project) => project.id === id
    ).clapCount;

    fetch(`http://localhost:4000/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clapCount: currentClapCount + 1 }),
    });
    setProjects(
      projects.map((project) => {
        if (project.id === id) {
          return { ...project, clapCount: currentClapCount + 1 };
        } else {
          return project;
        }
      })
    );
  };

  const editProject = (updatedProject) => {
    setProjects(
      projects.map((project) => {
        if (project.id === updatedProject.id) {
          return updatedProject;
        } else {
          return project;
        }
      })
    );
  };

  const selectedProject = projects.find((p) => p.id === projectId);

  useEffect(() => {
    fetch("http://localhost:4000/projects")
      .then((resp) => resp.json())
      .then((projects) => setProjects(projects));
  }, []);

  const onToggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };

  const onAddProject = (newProj) => {
    setProjects((projects) => [...projects, newProj]);
  };

  const completeEditing = () => {
    setProjectId(null);
  };

  const enterProjectEditModeFor = (projectId) => {
    setProjectId(projectId);
  };

  const renderForm = projectId ? (
    <ProjectEditForm
      key={projectId}
      project={selectedProject}
      editProject={editProject}
      completeEditing={completeEditing}
    />
  ) : (
    <ProjectForm onAddProject={onAddProject} />
  );

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
      {renderForm}
      <ProjectList
        deleteProject={deleteProject}
        addClap={addClap}
        projects={projects}
        enterProjectEditModeFor={enterProjectEditModeFor}
      />
    </div>
  );
};

export default App;
