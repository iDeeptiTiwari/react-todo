import React, { useState } from 'react';

export default function AddTodo(props) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [isError, setIsError] = useState(false);


    const onSubmit = (e) => {
        console.log("insdeSubmit");
        e.preventDefault();

        if (!title || !desc) {
            setIsError(true)
        } else {
            props.addTodo(title, desc)
            setTitle("");
            setDesc("");
        }
    };

    return (
        <div className="container mx-auto mt-5 p-5 card">
            {isError && <div class="alert alert-danger align-items-center d-flex justify-content-between" role="alert">
                <p class="mb-0">Title and description can't be left empty</p>
                <button onClick={() => setIsError(false)} class="alert-close" type="button" aria-label="Close">&times;</button>
            </div>}
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Task Name</label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="form-control" id="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} className="form-control" id="desc" />
                </div>
                <button type="submit" className="btn btn-success">Add</button>
            </form>
        </div>

    )
}