import { useState } from "react";

const Task = ({ task, setTasks, updateTask, deleteTask }) => {
  // State to manage the input value for editing tasks
  const [editTask, setEditTask] = useState("");

  // Function to handle editing a task
  const handleEditTask = (task) => {
    setEditTask(task.text);
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id ? { ...prevTask, editing: true } : prevTask
      )
    );
  };

  // Function to handle input change for editing tasks
  const handleEditInputChange = (event) => {
    setEditTask(event.target.value);
  };

  // Function to handle editing form submission
  const handleEditFormSubmit = (event, task) => {
    event.preventDefault();
    if (editTask.trim() === "") return; // Prevent updating task with empty text

    // Update the task
    updateTask({ ...task, text: editTask });

    // Clear the input field
    setEditTask("");
  };

  return (
    <li
      key={task.id}
      className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2"
    >
      {task.editing ? (
        <form
          onSubmit={(event) => handleEditFormSubmit(event, task)}
          className="d-flex align-items-center justify-content-between"
        >
          <input
            type="text"
            className="form-control"
            value={editTask}
            onChange={handleEditInputChange}
          />
          <button type="submit" className="btn btn-primary ms-2">
            Save
          </button>
        </form>
      ) : (
        <div>
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            checked={task.completed}
            onChange={() => {
              // Toggle the completed status of the task
              updateTask({ ...task, completed: !task.completed });
            }}
          />
          {task.text}
        </div>
      )}

      <div>
        <span className="fa fa-pencil text-success mx-5" onClick={() => handleEditTask(task)}></span>
        <span className="fa fa-times text-danger" onClick={() => deleteTask(task)}></span>
      </div>
    </li>
  );
};

export default Task;