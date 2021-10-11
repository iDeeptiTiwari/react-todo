// import logo from './logo.svg';
import './App.css';
import Header from "./MyComponents/header";
import Todos from "./MyComponents/todos";
import AddTodo from "./MyComponents/addTodo";
import Footer from "./MyComponents/footer";
import React, { useState, useEffect } from 'react';


function App() {
  let initTodos;
  if (localStorage.getItem("todos") === null) {
    initTodos = [];
  } else {
    initTodos = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am in onDelete of todo: ", todo);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
  }

  const addTodo = (task, desc) => {
    console.log("InsideADDTODO");
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const newTodo = {
      sno: sno, task: task, desc: desc
    }
    console.log(newTodo);
    setTodos([...todos, newTodo]);


  }

  const [todos, setTodos] = useState(initTodos);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <Header title="MyTodosList" searchBar={false} />
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
      <Footer />
    </>
  );
}

export default App;