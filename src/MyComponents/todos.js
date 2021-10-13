import React from 'react'
import TodoItem from "./TodoItem";

export default function todos(props) {
    const mystyle = {
        minHeight: "70vh"
    }


    return (
        <div className="container mx-auto mt-5" style={mystyle}>
            <h3 className="text-center">Todos List</h3>
            {
                props.todos.length === 0 ? "No todos to display" :
                    props.todos.map((todo) => {
                        return <TodoItem todo={todo} key={todo.sno} onDelete={() => { props.onDelete(todo) }} />
                    })}

        </div>
    )
}
