import { useState } from "react";

const TaskForm = ({ tasks, setTasks, createTask }) => {
  // State to manage the input value for new tasks
  const [newTask, setNewTask] = useState("");

  // Function to handle input change
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  // Function to handle form submission (adding new task)
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() === "") return; // Prevent adding empty tasks

    // Create a new task
    createTask(newTask);

    // Clear the input field
    setNewTask("");
  };

  return (
    <form
      className="d-flex justify-content-center align-items-center mb-4"
      onSubmit={handleFormSubmit}
    >
      <div className="form-outline flex-fill">
        <input
          type="text"
          className="form-control"
          placeholder="Add new task.."
          value={newTask}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary ms-2">
        Add
      </button>
    </form>
  );
};

export default TaskForm;