import { useState } from "react";
import Example from "./Example";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Deliverable 3: Refactor the filter component out of
  // `ProjectList` and implement inverse data flow

  // - Refactor the `searchQuery` state and the filter
  // method inside of the `ProjectList` component to
  // the `App` component

  // - Using inverse data flow, get the value of the
  // input field UP to the App component

  // - Write a callback function inside the App
  // component:

  //   - the function should take in a new search value
  // and set state with that value

  //   - pass the callback function down as a prop to
  // `ProjectList`

  // - Call the callback function from the onChange
  // event listener

  const filteredProjects = projects
    .filter((project) => {
      return project.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .map((project) => <ProjectListItem key={project.id} {...project} />);

  return (
    <section>
      <h2>Projects</h2>
      <Example />
      <div className="filter">
        <button type="button">All</button>
        <button type="button">Phase 5</button>
        <button type="button">Phase 4</button>
        <button type="button">Phase 3</button>
        <button type="button">Phase 2</button>
        <button type="button">Phase 1</button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul className="cards">{filteredProjects}</ul>
    </section>
  );
};

export default ProjectList;
