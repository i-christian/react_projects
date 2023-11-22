import "../index.css";
import Todo from "./Todo";
import { FILTER_MAP } from "./filterTasks";

const Tasks = ({
  tasks,
  filter,
  toggleTaskCompleted,
  handleDelete,
  handleEdit,
}) => {
  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    ?.map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <section>
      <h2 className="text-center p-2 text-xl bg-teal-300 mt-1 mb-1">
        {headingText}
      </h2>
      <ul
        role="list"
        className="flex flex-col text-xl"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </section>
  );
};

export default Tasks;
