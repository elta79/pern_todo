const express = require("express")
const app = express()  //var runs express library
const cors = require("cors")
const pool =require("./db") //to run queries with postgres


//middleware
app.use(cors())
    //get data from clientside
app.use(express.json()) // gives access to request.body obj

//ROUTES//

//create a todo
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})
//get all todos
app.get("/todos", async(req, res) =>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", 
            [id]
        )
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//update a todo
app.put("/todos/:id", async(req, res) =>{
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]
        )
        res.json("Todo was updated")
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')   
    }
})

//delete a todo
app.delete("/todos/:id", async(req, res) =>{
    try {
        const { id }= req.params
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]       
        )
        res.json("Todo was deleted")
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// to start server
app.listen(5000, () => { 
    console.log("server has started on port 5000") //callback fxn
})
