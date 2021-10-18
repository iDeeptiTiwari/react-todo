import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

export default function Todos(props) {
  const mystyle = {
    minHeight: "70vh",
  };

  return (
    <div className="container mx-auto mt-5" style={mystyle}>
      <h3 className="text-center">Todos List</h3>
      {props.todos.length === 0 ? (
        <p className="text-center">No todos to display</p>
      ) : (
        props.todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.sno}
              onDelete={() => {
                props.onDelete(todo);
              }}
            />
          );
        })
      )}
    </div>
  );
}

Todos.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.exact({
      task: PropTypes.string,
      desc: PropTypes.string,
      sno: PropTypes.number,
    })
  ).isRequired,
};
