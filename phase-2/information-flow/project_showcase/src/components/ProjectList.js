import ProjectListItem from "./ProjectListItem";
import { useState } from "react";

const ProjectList = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = projects.filter((project) => {
    return project.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const projectListItems = searchResults.map((project) => (
    <ProjectListItem key={project.id} {...project} />
  ));

  const handleOnChange = (e) => setSearchQuery(e.target.value);

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

  return (
    <section>
      <h2>Projects</h2>

      <div className="filter">
        <button>All</button>
        <button>Phase 5</button>
        <button>Phase 4</button>
        <button>Phase 3</button>
        <button>Phase 2</button>
        <button>Phase 1</button>
      </div>
      <input type="text" placeholder="Search..." onChange={handleOnChange} />

      <ul className="cards">{projectListItems}</ul>
    </section>
  );
};

export default ProjectList;
