import { render, fireEvent } from "@testing-library/react";
import ToDoItem from "./TodoItem";

const onDeleteMock = jest.fn();

describe("rendering tests", () => {
  const todoItem = {
    todo: { task: "hello title", desc: "hello description", sno: 2 },
    onDelete: onDeleteMock,
  };

  it("should render todo item", () => {
    const { getByRole, getByText } = render(<ToDoItem {...todoItem} />);
    const h3 = getByRole("heading");
    const paragraph = getByText(todoItem.todo.desc);
    const doneButton = getByRole("button");

    expect(h3).toBeInTheDocument();
    expect(h3.innerHTML).toBe(todoItem.todo.task);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.innerHTML).toBe(todoItem.todo.desc);
    expect(doneButton).toBeInTheDocument();
    expect(doneButton.innerHTML).toBe("Done");
  });

  it("should render DONE button", () => {
    const { getByRole } = render(<ToDoItem {...todoItem} />);

    const doneButton = getByRole("button");

    expect(doneButton).toBeInTheDocument();
    expect(doneButton.innerHTML).toBe("Done");
  });
});
