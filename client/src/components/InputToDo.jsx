import { useState } from "react"


function InputToDo() {

    const [description, setDescription] = useState("")

    const onSubmitForm = async e =>  {
        e.preventDefault() //dont refresh
        try {
            const body = { description }
            //eslint-disable-next-line no-unused-vars
            const response = await fetch("http://localhost:5000/todos", { 
                method: "POST",  //by default fetch makes GET request
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }) 

            window.location = '/'  //when response sent, window refresh

        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <>
            <h1 className='text-center mt-5'>PERN ToDo List</h1>
            <form className='d-flex mt-5' onSubmit={ onSubmitForm }>
                <input 
                    id='description-input'
                    type='text' 
                    className='form-control' 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
                <button className='btn btn-success'>Add</button>
            </form>
        </>
        
    )
}

export default InputToDo