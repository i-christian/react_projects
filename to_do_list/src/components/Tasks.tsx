import Todo from "./Todo";
import { FILTER_MAP, FilterType } from "./filterTasks";

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TasksProps {
  tasks: Task[];
  filter: FilterType;
  toggleTaskCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string, newName: string) => void;
}

const Tasks = ({
  tasks,
  filter,
  toggleTaskCompleted,
  handleDelete,
  handleEdit,
}: TasksProps) => {
  const filteredTasks = tasks.filter(FILTER_MAP[filter]);

  const taskList = filteredTasks.map((task) => (
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

  const tasksNoun = filteredTasks.length !== 1 ? "tasks" : "task";
  const headingText = `${filteredTasks.length} ${tasksNoun} remaining`;

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
