import { render } from "@testing-library/react";
import Todos from "./Todos";

const generateData = () => [
  {
    sno: 1,
    task: "1st task",
    desc: "desc",
  },
  {
    sno: 2,
    task: "2nd task",
    desc: "desc 2",
  },
  {
    sno: 3,
    task: "3rd task",
    desc: "desc 3",
  },
];
describe("rendering tests", () => {
  it("should display no todo message when todos length is 0", () => {
    const { getByText } = render(<Todos todos={[]} />);
    expect(getByText("No todos to display")).toBeInTheDocument();
  });

  it("should not display no to do message when todos length is not 0", () => {
    const todoList = generateData();
    const { queryByText } = render(<Todos todos={todoList} />);
    expect(queryByText("No todos to display")).not.toBeInTheDocument();
  });

  it("should render same number of todos as in to do list", () => {
    const todoList = generateData();
    const { getAllByTestId, rerender } = render(<Todos todos={todoList} />);
    let allTodos = getAllByTestId("todo-item");
    expect(allTodos.length).toBe(3);
    todoList.push({
      sno: 4,
      task: "4th task",
      desc: "desc 4",
    });

    rerender(<Todos todos={todoList} />);
    allTodos = getAllByTestId("todo-item");
    expect(allTodos.length).toBe(4);

    todoList.pop();
    rerender(<Todos todos={todoList} />);
    allTodos = getAllByTestId("todo-item");
    expect(allTodos.length).toBe(3);
  });

  //   it("should show warning in console when key prop is not provided", () => {
  //     render(<Todos todos={[{ task: "some task", desc: "some desc" }]} />);

  //     const consoleMock = jest.spyOn(global.console, "error");

  //     expect(consoleMock).toHaveBeenCalledTimes(2);

  //     consoleMock.mockRestore();

  //     //expect(allTodos.length).toBe(4);
  //   });

  //TODO
  // write test when key prop is not passed
});
