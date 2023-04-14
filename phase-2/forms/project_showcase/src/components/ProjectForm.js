import { useState } from "react";

const ProjectForm = ({ addNewProject }) => {
  const [newProject, setNewProject] = useState({
    name: "",
    about: "",
    phase: "",
    link: "",
    image: "",
  });

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // update the projects state in App so the newProject is in that array
    addNewProject(newProject);

    setNewProject({
      name: "",
      about: "",
      phase: "",
      link: "",
      image: "",
    });
  };

  const { name, about, phase, link, image } = newProject;

  return (
    <section>
      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <h3>Add New Project</h3>

        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          id="name"
          name="name"
        />

        <label htmlFor="about">About</label>
        <textarea
          value={about}
          onChange={handleChange}
          id="about"
          name="about"
        />

        <label htmlFor="phase">Phase</label>
        <select value={phase} onChange={handleChange} name="phase" id="phase">
          <option>Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input
          value={link}
          onChange={handleChange}
          type="text"
          id="link"
          name="link"
        />

        <label htmlFor="image">Screenshot</label>
        <input
          value={image}
          onChange={handleChange}
          type="text"
          id="image"
          name="image"
        />

        <button type="submit">Add Project</button>
      </form>
    </section>
  );
};

export default ProjectForm;
