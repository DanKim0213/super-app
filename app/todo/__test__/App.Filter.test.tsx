import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import App from "../page";
import Todo from "../_components/Todo";
import { getTasks } from "../_actions";

jest.mock("nanoid", () => {
  return {
    nanoid: jest.fn(),
  };
});
jest.mock("../_components/Todo");
jest.mock("../_components/Form");
jest.mock("../_actions/index.ts");

const mockTodo = jest.mocked(Todo);
const mockGetTasks = jest.mocked(getTasks);

const tasks = [
  { name: "Eat", id: "todo-0", completed: false },
  { name: "Drink", id: "todo-1", completed: true },
];

describe("Filter Integration test", () => {
  beforeEach(() => {
    mockGetTasks.mockReturnValue(tasks);
  });

  afterEach(() => {
    mockTodo.mockClear();
  });

  it("filters tasks by All initially", async () => {
    render(<App />);

    expect(mockTodo).toHaveBeenCalledTimes(tasks.length);
    const $filter = screen.getByRole("button", { pressed: true });

    expect($filter).toHaveTextContent(/all/i);
  });

  it("changes the filter to show only completed tasks", async () => {
    render(<App />);

    mockTodo.mockClear();
    const $filter = screen.getByRole("button", { name: /complete/i });
    await userEvent.click($filter);

    // `toHaveBeenCalledWith()` tests if the expected one have ever been called with `received` at least once.
    // Therefore, `not.toHaveBeenCalledWith` is preferable.
    expect(mockTodo).not.toHaveBeenCalledWith(
      expect.objectContaining({
        completed: false,
      }),
      {} // idk but I guess it comes from React.jsx
    );
  });

  it("groups active todos at the top side while completed todos at the bottom side", () => {
    render(<App />);

    const activeTasksLength = tasks.filter((task) => !task.completed).length;

    for (let i = 1; i <= tasks.length; i++) {
      if (i <= activeTasksLength) {
        expect(mockTodo).toHaveBeenNthCalledWith(
          i,
          expect.objectContaining({
            completed: false,
          }),
          {}
        );
      } else {
        expect(mockTodo).toHaveBeenNthCalledWith(
          i,
          expect.objectContaining({
            completed: true,
          }),
          {}
        );
      }
    }
  });

  it("is changed to switch component in mobile", () => {
    render(<App />);

    const $switch = screen.getByRole("switch");

    expect($switch.closest("div")).toHaveClass("sm:hidden");
    expect($switch).toBeInTheDocument();
  });

  it("shows active todos when switch is activated in mobile", async () => {
    render(<App />);

    const $switch = screen.getByRole("switch");
    expect($switch).not.toBeChecked();
    expect(mockTodo).toHaveBeenCalledTimes(tasks.length);
    mockTodo.mockClear();
    await userEvent.click($switch);

    // Option 1.
    // expect(mockTodo).toHaveBeenCalledTimes(
    //   tasks.filter((task) => !task.completed).length
    // );

    // Option 2.
    expect(mockTodo).not.toHaveBeenCalledWith(
      expect.objectContaining({
        completed: true,
      }),
      {}
    );
  });
});
