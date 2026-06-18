const SearchFilter = ({
  filters,
  setFilters,
  setPage,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        name="search"
        placeholder="Search employee..."
        value={filters.search}
        onChange={handleChange}
      />

      <select
        name="department"
        value={filters.department}
        onChange={handleChange}
      >
        <option value="">
          All Departments
        </option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">
          Finance
        </option>
      </select>

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
      >
        <option value="">
          All Status
        </option>
        <option value="Active">
          Active
        </option>
        <option value="Inactive">
          Inactive
        </option>
      </select>
    </div>
  );
};

export default SearchFilter;