import { render, fireEvent, waitFor, within } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";

const server = setupServer(
  rest.get(
    `https://jsonplaceholder.typicode.com/posts/:postnumber`,
    (req, res, ctx) => {
      return res(ctx.json({ title: "my api title", body: "my api body" }));
    }
  )
);

beforeEach(() => global.localStorage.clear());
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

    const allTodos = () => queryAllByTestId("todo-item");

    expect(allTodos().length).toBe(0);

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

    expect(allTodos().length).toBe(1);

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

    expect(allTodos().length).toBe(2);

    const deleteButton = getAllByRole("button", { name: "Done" })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(queryAllByTestId("todo-item").length).toBe(1);
    });
  });

  it("should fetch random todo from API when AddRandomTodo button is clicked", async () => {
    const { getByRole, queryAllByTestId } = render(<App />);
    const randomtodoButton = getByRole("button", { name: "Add Random Todo" });
    fireEvent.click(randomtodoButton);
    const allTodos = () => queryAllByTestId("todo-item");

    await waitFor(() => expect(allTodos().length).toBe(1));
  });
});

//onRandomAdd test
