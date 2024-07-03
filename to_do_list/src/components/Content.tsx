import { useState } from "react";
import AddTasks from "./AddTasks";
import Navigation from "./Navigation";
import Tasks from "./Tasks";
import { DATA, Task } from "./data";
import "../index.css";
import { nanoid } from "nanoid";

interface ContentProps {}

const Content = (props: ContentProps) => {
  const [tasks, setTasks] = useState<Task[]>(DATA);
  const [filter, setFilter] = useState<string>("All");

  const addTask = (name: string) => {
    if (name === "") {
      return false;
    }
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompleted = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDelete = (id: string) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const handleEdit = (id: string, newName: string) => {
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
