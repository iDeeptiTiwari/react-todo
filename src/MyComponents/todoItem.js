import React from "react";
import PropTypes from "prop-types";

export default function TodoItem(props) {
  return (
    <div
      data-testid="todo-item"
      className="row justify-content-around align-items-center"
    >
      <div className="col-11">
        <h3>{props.todo.task}</h3>
        <p>{props.todo.desc}</p>
      </div>
      <div className="col-1">
        <button
          className="btn btn-sm btn-danger mx-auto"
          onClick={props.onDelete}
        >
          Done
        </button>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  todo: PropTypes.exact({
    task: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    sno: PropTypes.number,
  }),
};
