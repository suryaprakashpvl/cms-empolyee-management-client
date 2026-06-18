import moment from "moment";
const EmployeeTable = ({
  employees,
  setSelectedEmployee,
  setShowForm,
  setEmployeeToDelete,
  setDeleteModal,
  handleEdit
}) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Status</th>
          <th>Joining Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td>{emp?.employeeName}</td>
            <td>{emp?.email}</td>
            <td>{emp?.department}</td>
            <td>{emp?.designation}</td>
            <td>
              <span
                className={
                  emp?.status === "Active"
                    ? "active"
                    : "inactive"
                }
              >
                {emp?.status}
              </span>
            </td>
            <td>{emp?.joiningDate ? moment(emp?.joiningDate).format("YYYY-MM-DD") : ""}</td>

            <td>
              <button
                className="edit-btn"
                onClick={() => {
                  setSelectedEmployee(emp);
                  handleEdit(emp);
                }}
              >
                Edit
              </button>{" "}
             <button
                className="delete-btn"
                onClick={() => {
                  setEmployeeToDelete(emp._id);
                  setDeleteModal(true);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;