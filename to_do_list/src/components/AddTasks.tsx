import { useState, ChangeEvent, FormEvent } from 'react';

interface Props {
  addTask: (taskName: string) => void;
}

const AddTasks = ({ addTask }: Props) => {
  const [name, setName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(name);
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mt-2 mb-2"
    >
      <h2 className="hidden sm:block text-xl grow-0">
        <label className="text-2xl text-white" htmlFor="new-todo-input">Add Tasks: </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="border border-cyan-500 p-2 hover:border-cyan-900 m-auto rounded-md sm:grow"
        name="text"
        placeholder="Add task"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="border p-2 w-24 text-center bg-slate-600 text-white m-auto hover:bg-blue-700 rounded sm:grow-0"
      >
        Add
      </button>
    </form>
  );
};

export default AddTasks;
