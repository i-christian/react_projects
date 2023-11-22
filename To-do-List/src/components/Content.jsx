import AddTasks from "./AddTasks";
import Navigation from "./Navigation";
import { DATA } from "./data";
import Tasks from "./Tasks";
import "../index.css";
import { nanoid } from "nanoid";
import { useState } from "react";

const Content = () => {
  const [tasks, setTasks] = useState(DATA);
  const [filter, setFilter] = useState("All");

  const addTask = (name) => {
    if (name === "") {
      return false;
    }
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  };
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const handleEdit = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  return (
    <main className="flex flex-col h-screen">
      <AddTasks addTask={addTask} />
      <Navigation filter={filter} setFilter={setFilter} />
      <Tasks
        filter={filter}
        tasks={tasks}
        handleDelete={handleDelete}
        toggleTaskCompleted={toggleTaskCompleted}
        handleEdit={handleEdit}
      />
    </main>
  );
};

export default Content;
