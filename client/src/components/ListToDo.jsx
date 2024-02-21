import { useEffect, useState } from "react"
import EditToDo from './EditToDo'


//useEffect will make fetch request to restful api each time component is rendered
function ListToDo() {

    const [todos, setTodos]= useState([])

    //delete todo function
    const deleteTodo = async id => {
        try {
            //eslint-disable-next-line no-unused-vars
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, { 
                method: "DELETE",
            })

            setTodos(todos.filter(todo => todo.todo_id !== id)) //render all todos expect for id that was deleted
            
        } catch (err) {
            console.error(err.message)
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json() //parse data, await b/c takes time

            setTodos(jsonData)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=>{
        getTodos()
    }, [])

   console.log(todos)

    return (
        <>
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td >{todo.description}</td>
                        <td>
                            <EditToDo todo={todo}/> {/* pass props from todo list */}
                        </td>
                        <td>
                            <button className='btn btn-danger' onClick={()=> deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )


}



export default ListToDo