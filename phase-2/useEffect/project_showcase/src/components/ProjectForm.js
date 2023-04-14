import { useState } from "react";

const ProjectForm = ({ addNewProject }) => {
  const initialFormValues = {
    name: "",
    about: "",
    phase: "",
    link: "",
    image: "",
  };

  const [newProject, setNewProject] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Deliverable 1: Persist the new project upon the
    // `ProjectForm` submission

    // Send the new project data to the server using a
    // `POST` fetch request

    addNewProject(newProject);
    setFormData(initialFormValues);
  };

  const { name, about, phase, link, image } = newProject;

  return (
    <section>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h3>Add New Project</h3>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
        />

        <label htmlFor="about">About</label>
        <textarea
          id="about"
          name="about"
          value={about}
          onChange={handleChange}
        />

        <label htmlFor="phase">Phase</label>
        <select name="phase" id="phase" value={phase} onChange={handleChange}>
          <option>Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input
          type="text"
          id="link"
          name="link"
          value={link}
          onChange={handleChange}
        />

        <label htmlFor="image">Screenshot</label>
        <input
          type="text"
          id="image"
          name="image"
          value={image}
          onChange={handleChange}
        />

        <button type="submit">Add Project</button>
      </form>
    </section>
  );
};

export default ProjectForm;
