import { useEffect, useState } from "react";
import EmployeeTable from "../../components/EmployeeTable";
import EmployeeForm from "../../components/EmployeeForm";
import SearchFilter from "../../components/SearchFilter";
import { getEmployees, createEmployee,updateEmployee,deleteEmployee} from "../../services/employeeService";
import useDebounce from "../../hooks/useDebounce";
import DeleteConfirmationModal from "../../components/ConfirmModal";
import moment from "moment";
import Navbar from '../../components/common/Navbar';
import { showSuccess, showError } from "../../utils/toast";


const initialFormData = {
  employeeName: "",
  email: "",
  department: "",
  designation: "",
  status: "Active",
  joiningDate: "",
};



const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteModal, setDeleteModal] =
  useState(false);

const [employeeToDelete, setEmployeeToDelete] =
  useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

const [formData, setFormData] =
  useState(initialFormData);

const [errors, setErrors] = useState({});

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
  });

  const debouncedSearch = useDebounce(filters.search, 1000);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees({
        page,
        limit: 10,
        search: debouncedSearch,
        department: filters.department,
        status: filters.status,
      });

      setEmployees(response.employees);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
      showError("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [  page,showForm,
    debouncedSearch,
    filters.department,
    filters.status,]);

const handledeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      showSuccess("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.message || "Failed to delete employee");
    }
  };

const handleEdit = (employee) => {
  setFormData({
    employeeName: employee?.employeeName,
    email: employee?.email,
    department: employee?.department,
    designation: employee?.designation,
    status: employee?.status,
    joiningDate: employee?.joiningDate ? moment(employee?.joiningDate).format("YYYY-MM-DD") : "",
  });

  setShowForm(true);
};

const handleAdd = () => {
  setSelectedEmployee(null);
  setFormData(initialFormData);
  setErrors({});
  setShowForm(true);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {
    if (selectedEmployee) {
      await updateEmployee(
        selectedEmployee._id,
        formData
      );
    } else {
      await createEmployee(formData);
    }

    await fetchEmployees();
showSuccess(`Employee ${
      selectedEmployee ? "updated" : "added"
    } successfully`);
    setShowForm(false);
    setErrors({});
  } catch (error) {
    console.error(error);
    showError(error.response?.data?.message || "Failed to submit form");
  }
};


const validateForm = () => {
  const newErrors = {};

  if (!formData.employeeName.trim()) {
    newErrors.employeeName =
      "Employee name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email =
      "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email
    )
  ) {
    newErrors.email =
      "Please enter a valid email";
  }

  if (!formData.department.trim()) {
    newErrors.department =
      "Department is required";
  }

  if (!formData.designation.trim()) {
    newErrors.designation =
      "Designation is required";
  }

  if (!formData.status) {
    newErrors.status =
      "Status is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  return (
    <>
    <Navbar />
  
    <div className="dashboard">
      <header className="header">
        <h2>Employee List</h2>

        <button className="addEmployee-btn" 
          onClick={() => {
            setSelectedEmployee(null);
            setFormData(initialFormData);
            setErrors({});
            setShowForm(true);
          }}
        >
          Add Employee
        </button>
      </header>

      <SearchFilter
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
      />

      <EmployeeTable
        employees={employees}
        setSelectedEmployee={setSelectedEmployee}
        setShowForm={setShowForm}
        setEmployeeToDelete={setEmployeeToDelete}
        setDeleteModal={setDeleteModal}
        handleEdit={handleEdit}
      />

      <div className="pagination">
  <button
    className="page-btn"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    ←
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      className={`page-btn ${
        page === index + 1
          ? "active-page"
          : ""
      }`}
      onClick={() =>
        setPage(index + 1)
      }
    >
      {index + 1}
    </button>
  ))}

  <button
    className="page-btn"
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    →
  </button>
</div>

      {showForm && (
      <EmployeeForm
  formData={formData}
  setFormData={setFormData}
  errors={errors}
  handleSubmit={handleSubmit}
  selectedEmployee={selectedEmployee}
  setShowForm={setShowForm}
  setErrors={setErrors}
/>
      )}

      <DeleteConfirmationModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => {
          handledeleteEmployee(employeeToDelete);
          setDeleteModal(false);
        }}
      />
    </div>
      </>
  );
};

export default Dashboard;