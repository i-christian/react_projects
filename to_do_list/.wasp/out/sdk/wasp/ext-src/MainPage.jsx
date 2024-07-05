import {
  updateTask,
  createTask,
  getTasks,
  useQuery
} from 'wasp/client/operations';
import { logout } from 'wasp/client/auth';
import "./Main.css";

export const MainPage = ({ user }) => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  return (
    <div className="my-5 flex flex-col w-2/3 mx-auto">
      <NewTaskForm />
      {tasks && <TasksList tasks={tasks} />}

      {isLoading && 'Loading...'}
      {error && 'Error: ' + error}
      <button onClick={logout} className="bg-blue-500 hover:bg-blue-900 text-white max-w-fit p-2 rounded-md mt-5">Logout</button>
    </div>
  )
}

const TaskView = ({ task }) => {
  const handleIsDoneChange = async (event) => {
    try {
      await updateTask({
        id: task.id,
        isDone: event.target.checked,
      })
    } catch (error) {
      window.alert('Error while updating task: ' + error.message)
    }
  }

  return (
    <div>
      <input
        type="checkbox"
        id={String(task.id)}
        checked={task.isDone}
        onChange={handleIsDoneChange}
      />
      {task.description}
    </div>
  )
}

const TasksList = ({ tasks }) => {
  if (!tasks?.length) return <div>No tasks</div>

  return (
    <div>
      {tasks.map((task, idx) => (
        <TaskView task={task} key={idx} />
      ))}
    </div>
  )
}

const NewTaskForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const target = event.target
      const description = target.description.value
      target.reset()
      await createTask({ description })
    } catch (err) {
      window.alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" type="text" defaultValue="" className="rounded-md border border-black p-2 mr-2 mb-10" />
      <input type="submit" value="Create task" className="text-xl bg-blue-500 hover:bg-blue-900 text-white rounded-lg p-2" />
    </form>
  )
}
