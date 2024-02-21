import PropTypes from 'prop-types'
import { useState } from 'react'

function EditToDo({ todo }){
    const [description, setDescription]= useState(todo.description)

    //edit description function
    const updateDescription =async e => {
        e.preventDefault()
        try {
            const body = {description}
            //eslint-disable-next-line no-unused-vars
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{  
                method: 'PUT', //bc updating
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify(body)
            })
            
            window.location = "/" //refreshes window
        } catch (err) {
            console.error(err.message)
        }
    }
    return(
        <>
            <button 
                type="button" 
                className="btn btn-primary" 
                data-toggle="modal" 
                data-target={`#id${todo.todo_id}`} //targets dynamic id 
            >
            Edit
            </button>

            <div className="modal" id={`id${todo.todo_id}`}>      {/* (id=id10) */}
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button 
                        type="button" 
                        className="close" 
                        data-dismiss="modal"
                        onClick={() => setDescription(todo.description)} 
                    >&times;
                    </button>
                </div>

                
                <div className="modal-body">
                    <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}   //when input, changes description of the targeted value
                />
                </div>

                
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        data-dismiss="modal"
                        onClick={e => updateDescription(e)} //sends change to db
                    >
                        Edit
                    </button>
                        <button 
                        type="button" 
                        className="btn btn-danger" 
                        data-dismiss="modal"
                        onClick={() => setDescription(todo.description)}  //set to original description
                    >
                        Close
                    </button>
                </div>

                </div>
            </div>
            </div>
        </>
    )
}

EditToDo.propTypes = {
    todo: PropTypes.object
}

export default EditToDo

