import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
beforeEach(() => global.localStorage.clear());
describe("rendering tests", () => {
  it("should renders app component", () => {
    const { getByRole } = render(<App />);
    const main = getByRole("main");
    expect(main).not.toBeEmptyDOMElement();
  });
});

describe("functionality tests", () => {
  it("should add todo in todo list when ADD button is clicked", () => {
    const { queryByText, getAllByTestId, getByLabelText, getByText } = render(
      <App />
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
    const allTodos = getAllByTestId("todo-item");

    expect(allTodos.length).toBe(1);
    expect(queryByText("hello description")).toBeInTheDocument();
    expect(queryByText("hello title")).toBeInTheDocument();
  });

  it("should remove todo in todo list when DONE button is clicked", async () => {
    const { getAllByRole, queryAllByTestId, getByLabelText, getByText } =
      render(<App />);
    const taskInputbox = getByLabelText("Task Name");
    const descInputbox = getByLabelText("Description");
    const submitButton = getByText("Add");

    const allTodos1 = queryAllByTestId("todo-item");

    expect(allTodos1.length).toBe(0);

    fireEvent.change(descInputbox, {
      target: {
        value: "hello description 1",
      },
    });

    fireEvent.change(taskInputbox, {
      target: {
        value: "hello title 1",
      },
    });

    fireEvent(submitButton, new MouseEvent("click"));
    let allTodos2 = queryAllByTestId("todo-item");
    expect(allTodos2.length).toBe(1);

    fireEvent.change(descInputbox, {
      target: {
        value: "hello description 2",
      },
    });

    fireEvent.change(taskInputbox, {
      target: {
        value: "hello title 2",
      },
    });

    fireEvent(submitButton, new MouseEvent("click"));
    allTodos2 = queryAllByTestId("todo-item");
    expect(allTodos2.length).toBe(2);

    const deleteButton = getAllByRole("button", { name: "Done" })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(queryAllByTestId("todo-item").length).toBe(1);
    });
  });
});

//onRandomAdd test
