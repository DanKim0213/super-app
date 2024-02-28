import { useState } from "react";

type PropsType = {
  addTask: (name: string) => void;
};

function Form(props: PropsType) {
  const [name, setName] = useState("");
  const [isEmpty, setEmpty] = useState(false); // isEmpty is enabled when to add a todo

  // NOTE: As written, this function has a bug: it doesn't prevent the user
  // from submitting an empty form. This is left as an exercise for developers
  // working through MDN's React tutorial.
  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (name.trim().length === 0) {
      setEmpty(true);
      return;
    }

    setEmpty(false);
    props.addTask(name);
    setName("");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="new-todo-input" className="block text-center">
        What needs to be done?
      </label>
      <input
        type="text"
        id="new-todo-input"
        className={`border-2 border-black p-4 ${isEmpty && "alert"}`}
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="cursor-pointer border border-black bg-black py-2 capitalize text-white"
      >
        Add
      </button>
    </form>
  );
}

export default Form;
