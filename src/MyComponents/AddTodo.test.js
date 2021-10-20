import { render, fireEvent, waitFor } from "@testing-library/react";
import AddTodo from "./AddTodo";

let todoFn;
beforeAll(() => {
  todoFn = jest.fn();
});

describe("rendering tests", () => {
  it("should render add to do form", () => {
    const { getByRole } = render(<AddTodo addTodo={todoFn} />);
    const form = getByRole("form");
    expect(form).not.toBeEmptyDOMElement();
  });
  it("should render title inputbox", () => {
    const { getByLabelText } = render(<AddTodo addTodo={todoFn} />);
    const inputbox = getByLabelText("Task Name");
    expect(inputbox).toBeInTheDocument();
  });
  it("should render description inputbox", () => {
    const { getByLabelText } = render(<AddTodo addTodo={todoFn} />);
    const inputbox = getByLabelText("Description");
    expect(inputbox).toBeInTheDocument();
  });
  it("should render ADD button", () => {
    const { getByRole } = render(<AddTodo addTodo={todoFn} />);
    const b = getByRole("button", { name: "Add" });
    expect(b).toBeInTheDocument();
  });

  it("should render ADD RANDOM TODO button", () => {
    const { getByRole } = render(<AddTodo addTodo={todoFn} />);
    const button = getByRole("button", { name: "Add Random Todo" });
    expect(button).toBeInTheDocument();
  });
});

describe("functinality tests", () => {
  it("should show error alert when title is empty", async () => {
    const { findByRole, getByLabelText, getByText } = render(
      <AddTodo addTodo={todoFn} />
    );
    const descInputbox = getByLabelText("Description");

    fireEvent.change(descInputbox, {
      target: {
        value: "hello description",
      },
    });

    const submitButton = getByText("Add");
    fireEvent(submitButton, new MouseEvent("click"));

    const alert = await findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
  it("should show error alert when description is empty", async () => {
    const { findByRole, getByLabelText, getByText } = render(
      <AddTodo addTodo={todoFn} />
    );
    const taskInputbox = getByLabelText("Task Name");

    fireEvent.change(taskInputbox, {
      target: {
        value: "hello title",
      },
    });

    const submitButton = getByText("Add");
    fireEvent(submitButton, new MouseEvent("click"));

    const alert = await findByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("should show error alert when title and description are empty", async () => {
    const { findByRole, getByText } = render(<AddTodo addTodo={todoFn} />);

    const submitButton = getByText("Add");
    fireEvent(submitButton, new MouseEvent("click"));

    const alert = await findByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("should not show error alert when description and title are filled", async () => {
    const { queryByRole, getByLabelText, getByText } = render(
      <AddTodo addTodo={todoFn} />
    );
    const taskInputbox = getByLabelText("Task Name");
    const descInputbox = getByLabelText("Description");

    fireEvent.change(descInputbox, {
      target: {
        value: "hello description",
      },
    });

    fireEvent.change(taskInputbox, {
      target: {
        value: "hello title",
      },
    });

    const submitButton = getByText("Add");
    fireEvent(submitButton, new MouseEvent("click"));

    const alert = queryByRole("alert");
    expect(alert).not.toBeInTheDocument();

    expect(todoFn).toHaveBeenCalled();
    expect(todoFn).toHaveBeenCalledWith("hello title", "hello description");
  });

  it("should not show error alert when cross button is pressed", async () => {
    const { queryByRole, findByRole, getByText, getByRole } = render(
      <AddTodo addTodo={todoFn} />
    );

    const submitButton = getByText("Add");
    fireEvent(submitButton, new MouseEvent("click"));

    let alert = await findByRole("alert");
    expect(alert).toBeInTheDocument();

    const crossButton = getByRole("button", { name: "Close" });
    expect(crossButton).toBeInTheDocument();
    fireEvent.click(crossButton);

    await waitFor(() => {
      expect(queryByRole("alert")).not.toBeInTheDocument();
    });
  });
});
