import React from "react";

const EmployeeForm = ({
  selectedEmployee,
  setShowForm,
  formData,
  setFormData,
  errors,
  handleSubmit,
  setErrors
}) => {
 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  return (
    <div className="form-overlay">
      <div className="employee-modal">
        <div className="form-header">
          <h2>
            {selectedEmployee
              ? "Edit Employee"
              : "Add Employee"}
          </h2>

          <button
            className="close-btn"
            onClick={() => setShowForm(false)}
          >
            ✕
          </button>
        </div>

        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee Name</label>
            <input
              type="text"
              name="employeeName"
              placeholder="Enter employee name"
              value={formData?.employeeName}
              onChange={handleChange}
            />
            {errors?.employeeName && (
    <span className="error">
      {errors?.employeeName}
    </span>
  )}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email address"
              value={formData?.email}
              onChange={handleChange}
            />
            {errors.email && (
    <span className="error">
      {errors.email}
    </span>
  )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData?.department}
                onChange={handleChange}
              />
              {errors?.department && (
    <span className="error">
      {errors?.department}
    </span>
  )}
            </div>

            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData?.designation}
                onChange={handleChange}
              />
              {errors?.designation && (
    <span className="error">
      {errors?.designation}
    </span>
  )}
            </div>
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              placeholder="Joining Date"
              value={formData?.joiningDate || ""}
              onChange={handleChange}
            />
            {errors?.joiningDate && (
    <span className="error">
      {errors?.joiningDate}
    </span>
  )}
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
            {errors.status && (
    <span className="error">
      {errors.status}
    </span>
  )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                setShowForm(false)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {selectedEmployee
                ? "Update Employee"
                : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;