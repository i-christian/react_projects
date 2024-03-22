import { useState, ChangeEvent, FormEvent } from "react";
import "../index.css";

interface TodoProps {
  id: string;
  name: string;
  completed: boolean;
  toggleTaskCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string, newName: string) => void;
}

const Todo = ({
  id,
  name,
  completed,
  toggleTaskCompleted,
  handleDelete,
  handleEdit,
}: TodoProps) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEdit(id, newName);
    setNewName("");
    setEditing(false);
  };

  const viewTemplate = (
    <>
      <div className="flex p-2 flex-row items-center w-full border-hidden h-auto sm:w-2/3 sm:flex sm:flex-row sm:gap-2 sm:items-center">
        <input
          id={id}
          type="checkbox"
          className="rounded-full shadow w-8 h-full"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="text-ellipsis truncate" htmlFor={id}>
          {name}
        </label>
      </div>

      <div className="w-full p-2 flex flex-col text-center gap-2 grow-0 sm:w-1/3">
        <button
          type="button"
          className="border-hidden w-full h-fit text-center text-xl bg-slate-600 text-white hover:bg-blue-700 rounded-md"
          aria-pressed="false"
          onClick={() => setEditing(true)}
        >
          Edit <span className="hidden">{name}</span>
        </button>
        <button
          type="button"
          className="border-hidden w-full h-fit text-center text-xl bg-slate-600 text-white hover:bg-red-700 rounded-md"
          aria-pressed="false"
          onClick={() => handleDelete(id)}
        >
          Delete <span className="hidden">{name}</span>
        </button>
      </div>
    </>
  );

  const editingTemplate = (
    <form
      className="bg-white text-black flex flex-col gap-1 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <section className="flex flex-row gap-2">
        <label htmlFor={id}>Rename To:</label>
        <input
          id={id}
          className="border border-teal-400 rounded-lg"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </section>

      <section className="w-full flex gap-2 flex-col items-center justify-center sm:flex-row sm:w-60">
        <button
          type="button"
          className="border w-full h-fit text-center text-xl text-white bg-red-700 rounded-md"
          onClick={() => setEditing(false)}
        >
          Cancel <span className="hidden">renaming {name}</span>
        </button>
        <button
          type="submit"
          className="border w-full h-fit text-center text-xl text-white bg-blue-600 rounded-md"
        >
          Save <span className="hidden">new name for {name}</span>
        </button>
      </section>
    </form>
  );

  return (
    <li
      key={id}
      className="mt-1 mb-1 border-hidden bg-slate-200 flex flex-col gap-2 sm:flex-row sm:gap-2"
    >
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
};

export default Todo;
