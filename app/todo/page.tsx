"use client";
import { useState, useRef, useEffect } from "react";
import Form from "./_components/Form";
import Todo from "./_components/Todo";
import Filter from "./_components/Filter";
import { getTasks } from "./_actions";
import { nanoid } from "nanoid";

type TaskType = {
  id: string;
  name: string;
  completed: boolean;
};

function usePrevious(value: number) {
  const ref = useRef<null | number>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task: TaskType) => !task.completed,
  Completed: (task: TaskType) => task.completed,
};

export type FilterType = keyof typeof FILTER_MAP;

const FILTER_NAMES = Object.keys(FILTER_MAP) as Array<FilterType>;

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(getTasks());
  const [filter, setFilter] = useState<FilterType>("All");

  function toggleTaskCompleted(id: string) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id: string) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id: string, newName: string) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = (() => {
    let result;
    if (filter === "All") {
      const active = [];
      const completed = [];
      for (const task of tasks) {
        if (task.completed === true) completed.push(task);
        else active.push(task);
      }

      result = active.concat(completed);
    } else {
      result = tasks?.filter(FILTER_MAP[filter]);
    }

    return result.map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  })();

  function addTask(name: string) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef<null | HTMLHeadingElement>(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (typeof prevTaskLength == "number" && tasks.length < prevTaskLength) {
      listHeadingRef.current?.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <main className="max-w-3xl mx-auto">
      <div className="relative p-10 mt-8 mb-16 bg-white shadow-md">
        <h1 className="max-w-full text-4xl font-bold text-center">TodoMatic</h1>
        <Form addTask={addTask} />
        <Filter
          FILTER_NAMES={FILTER_NAMES}
          filter={filter}
          setFilter={setFilter}
        />
        <h2
          className="mx-10 mt-5 text-3xl font-bold"
          id="list-heading"
          tabIndex={-1}
          ref={listHeadingRef}
        >
          {headingText}
        </h2>
        <ul
          aria-labelledby="list-heading"
          className="flex flex-col gap-4 mx-10 mt-2"
          role="list"
        >
          {taskList}
        </ul>
      </div>
    </main>
  );
}

export default App;
