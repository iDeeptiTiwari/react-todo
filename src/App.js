import "./App.css";
import Header from "./MyComponents/Header";
import Todos from "./MyComponents/Todos";
import AddTodo from "./MyComponents/AddTodo";
import Footer from "./MyComponents/Footer";
import React, { useState, useEffect } from "react";

function App() {
  const initTodos = () => {
    const localTodos = localStorage.getItem("todos");
    return localTodos ? JSON.parse(localTodos) : [];
  };

  const [todos, setTodos] = useState(initTodos);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = (todo) => {
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
  };

  const addTodo = (task, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const newTodo = {
      sno: sno,
      task: task,
      desc: desc,
    };
    setTodos([...todos, newTodo]);
  };

  const addRandomTodo = () => {
    setIsLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${Math.floor(
        Math.random() * 100 + 1
      )}`
    )
      .then((res) => res.json())
      .then((res) => {
        addTodo(res.title, res.body);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <main>
      <Header title="MyTodosList" />
      <AddTodo
        isLoading={isLoading}
        addTodo={addTodo}
        addRandomTodo={addRandomTodo}
      />
      <Todos todos={todos} onDelete={onDelete} />
      <Footer />
    </main>
  );
}

export default App;
