const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// MIDDLEwARE
app.use(cors());
app.use(express.json());

//ROUTES

// create a todo

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todos (description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// get all todo

app.get('/todos', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos');
    res.status(201).json(todos.rows);
  } catch (error) {}
});
// get a todo

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query('SELECT * FROM todos WHERE todo_id = $1', [
      id
    ]);
    res.status(200).json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedTodo = await pool.query(
      'UPDATE todos SET description = $1 WHERE todo_id = $2 RETURNING *',
      [description, id]
    );
    res.status(200).json(updatedTodo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM todos WHERE todo_id = $1', [id]);
    res.json('Todo was deleted');
  } catch (error) {
    console.log(error.message);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listeh on port ${port}`));
