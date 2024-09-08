import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";

const App = () => {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([]);

  // State to manage the filter value
  const [filter, setFilter] = useState("all");

  // Function to filter tasks based on the filter value
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    } else if (filter === "completed") {
      return task.completed;
    } else {
      return true;
    }
  });

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/tasks/");
    const data = await response.json();
    setTasks(data);
  };

  // Function to create a new task
  const createTask = async (text) => {
    const response = await axios.post("http://" + window.location.hostname + ":8000/api/tasks/", {
      text: text,
      completed: false,
    });
    setTasks([...tasks, response.data]);
  };

  // Function to update a task
  const updateTask = async (task) => {
    const response = await axios.put(`http://${window.location.hostname}:8000/api/tasks/${task.id}/`, {
      ...task,
    });
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id ? response.data : prevTask
      )
    );
  };

  // Function to delete a task
  const deleteTask = async (task) => {
    await axios.delete(`http://${window.location.hostname}:8000/api/tasks/${task.id}/`);
    setTasks((prevTasks) =>
      prevTasks.filter((prevTask) => prevTask.id !== task.id)
    );
  };

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col col-md-6 col-span-1 bg-white rounded p-4">
          <h3 className="mb-4">UCDPA Todo App</h3>

          <TaskForm tasks={tasks} setTasks={setTasks} createTask={createTask} />

          <TaskFilter filter={filter} setFilter={setFilter} />

          <div className="tab-content" id="ex1-content">
            <ul className="list-group mb-0">
              {filteredTasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  setTasks={setTasks}
                  updateTask={updateTask}
                  deleteTask={deleteTask} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;