const TaskFilter = ({ filter, setFilter }) => {
  // Function to handle filter change
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <button
        className={`btn me-2 ${filter === "all" ? "btn-primary" : "btn-light"}`}
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        className={`btn me-2 ${
          filter === "active" ? "btn-primary" : "btn-light"
        }`}
        onClick={() => handleFilterChange("active")}
      >
        Active
      </button>
      <button
        className={`btn ${
          filter === "completed" ? "btn-primary" : "btn-light"
        }`}
        onClick={() => handleFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilter;