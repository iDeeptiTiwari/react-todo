import React from 'react'

export default function TodoItem(props) {

    return (
        <div className="row justify-content-around align-items-center">
            <div className="col-11">
                <h3>{props.todo.task}</h3>
                <p>{props.todo.desc}</p>
            </div>
            <div className="col-1">
                <button className="btn btn-sm btn-danger mx-auto" onClick={props.onDelete}>Done</button>
            </div>

        </div>
    )
}
