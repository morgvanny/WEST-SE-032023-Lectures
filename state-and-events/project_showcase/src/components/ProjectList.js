import ProjectListItem from "./ProjectListItem";
import { useState } from "react";

const ProjectList = ({ projects }) => {
  const [displayPhase, setDisplayPhase] = useState("all");

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  let displayedProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(input.toLowerCase())
  );

  if (displayPhase !== "all") {
    displayedProjects = displayedProjects.filter(
      (project) => project.phase === displayPhase
    );
  }

  const projectListItems = displayedProjects.map((project) => (
    <ProjectListItem key={project.id} {...project} />
  ));

  return (
    <section>
      <h2>Projects</h2>

      <div className="filter">
        <button
          type="button"
          onClick={() => {
            setDisplayPhase("all");
          }}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplayPhase(5);
          }}
        >
          Phase 5
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplayPhase(4);
          }}
        >
          Phase 4
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplayPhase(3);
          }}
        >
          Phase 3
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplayPhase(2);
          }}
        >
          Phase 2
        </button>
        <button
          type="button"
          onClick={() => {
            setDisplayPhase(1);
          }}
        >
          Phase 1
        </button>
      </div>
      <input
        onChange={handleChange}
        value={input}
        type="text"
        placeholder="Search..."
      />

      <ul className="cards">{projectListItems}</ul>
    </section>
  );
};

export default ProjectList;

// const Dog = ({ name, age }) => {
//   return (
//     <div>
//       <h1>{name}</h1>
//       <h2>Age: {age}</h2>
//     </div>
//   );
// };

// const dogs = [
//   { name: "Martin", age: 8 },
//   { name: "Luna", age: 3 },
//   { name: "Molly", age: 16 },
// ];

// dogs.filter((dog) => {
//   return dog.name.includes("M");
// });

// [];
