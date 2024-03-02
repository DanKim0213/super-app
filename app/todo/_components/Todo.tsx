import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * The reason why this hook can return the previous value is that
 * it returns `ref.current`, not `ref` itself.
 *
 * And, `ref.current` is assigned to a **new** value by `useEffect()`
 * whenever `setState()` is called.
 * (It could be assigned to a **new** object too.)
 */
function usePrevious(value: boolean) {
  const ref = useRef<null | boolean>(null);
  useEffect(() => {
    ref.current = value; // assign **newly created value e.g. [value], { value }
  });
  return ref.current;
}

type PropsType = {
  id: string;
  name: string;
  completed: boolean;
  editTask: (id: string, name: string) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompleted: (id: string) => void;
};

function Todo(props: PropsType) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const isEmpty = newName.trim().length === 0;

  const editFieldRef = useRef<null | HTMLInputElement>(null);
  const editButtonRef = useRef<null | HTMLButtonElement>(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value);
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (isEmpty) return;

    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-xl" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className={`border-2 border-neutral-600 py-1 px-2 text-xl ${
            isEmpty && "border-red-600"
          }`}
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex-1 py-1 text-xl border-2 border-neutral-600"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="hidden">renaming {props.name}</span>
        </button>
        <button
          type="submit"
          className="flex-1 py-1 text-xl text-white bg-black border-2 border-black"
        >
          Save
          <span className="hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="flex flex-col gap-3 ">
      <div className="relative flex items-center gap-3">
        <input
          className="bg-transparent border-2 appearance-none cursor-pointer peer h-11 w-11 border-neutral-600 "
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        {/* Custom Checkbox using input with `appearance-none` and label with `after:` */}
        <label
          className="text-lg cursor-pointer after:absolute after:left-3 after:top-3 after:box-content after:h-2 after:w-4 after:-rotate-45 after:cursor-pointer after:border-4 after:border-e-0 after:border-t-0 after:border-solid after:border-neutral-600 after:opacity-0 peer-checked:after:opacity-100 "
          htmlFor={props.id}
        >
          {props.name}
        </label>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="flex-1 py-1 text-xl border-2 border-neutral-600"
          onClick={() => {
            setEditing(true);
          }}
          ref={editButtonRef}
        >
          Edit <span className="hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="flex-1 py-1 text-xl text-white bg-red-600 border"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    // console.log("wasEditing and isEditing: ", wasEditing, isEditing);
    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current?.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
