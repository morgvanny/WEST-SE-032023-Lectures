import React, { useState } from "react";

function PizzaForm({ formData, setFormData, updatePizza }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePizza(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            onChange={handleChange}
            value={formData.topping}
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
          />
        </div>
        <div className="col">
          <select
            onChange={handleChange}
            value={formData.size}
            className="form-control"
            name="size"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              onChange={() => setFormData({ ...formData, vegetarian: true })}
              checked={formData.vegetarian}
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              onChange={() => {
                setFormData({ ...formData, vegetarian: false });
              }}
              checked={!formData.vegetarian}
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
