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
jest.mock("../_components/Todo"); // makes it undefined but tracked by mockImpl
jest.mock("../_components/FilterButton"); // makes it undefined
jest.mock("../_actions/index.ts");
// mock is automatically hoisted so that I create a separate file to test App with Form.

const mockTodo = jest.mocked(Todo);
const mockGetTasks = jest.mocked(getTasks);

const tasks = [
  { name: "Eat", id: "todo-0", completed: false },
  { name: "Drink", id: "todo-1", completed: true },
];

describe("Form Integration test", () => {
  beforeEach(() => {
    mockGetTasks.mockReturnValue(tasks);
  });

  it("adds a task", async () => {
    render(<App />);

    expect(mockTodo).toHaveBeenCalledTimes(2);
    mockTodo.mockClear();
    await userEvent.type(screen.getByRole("textbox"), "new task");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(mockTodo).toHaveBeenCalledTimes(3);
    expect(mockTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "new task",
      }),
      {}
    );
  });
});
