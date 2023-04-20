import { useState } from "react";

const NewListing = ({ createListing }) => {
  const [formData, setFormData] = useState({
    description: "",
    image: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createListing(formData);
    setFormData({
      description: "",
      image: "",
      location: "",
    });
  };

  const { description, image, location } = formData;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description">Description</label>
      <input
        name="description"
        id="description"
        onChange={handleChange}
        value={description}
      />
      <label htmlFor="image">Image</label>
      <input name="image" id="image" onChange={handleChange} value={image} />
      <label htmlFor="location">Location</label>
      <input
        name="location"
        id="location"
        onChange={handleChange}
        value={location}
      />
      <input type="submit" value="Create New Listing" />
    </form>
  );
};
export default NewListing;
