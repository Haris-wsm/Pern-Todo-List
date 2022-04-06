import React, { Fragment, useEffect, useState } from 'react';
import { apiRequest } from '../httpApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const apiTodos = await apiRequest.get('/todos');
    setTodos(apiTodos.data);
  };

  const deleteTodo = async (id) => {
    try {
      await apiRequest.delete('/todos/' + id);

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkedTodo = async (id) => {
    try {
      const updateTodo = todos.find((todo) => todo.todo_id === id);

      await apiRequest.put('/todos/' + id, {
        ...updateTodo,
        finished: !updateTodo.finished
      });
      setTodos(
        todos.map((todo) =>
          todo.todo_id === id ? { ...todo, finished: !todo.finished } : todo
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTodo = (id, newTask) => {
    try {
      setTodos(
        todos.map((todo) =>
          todo.todo_id === id ? { ...todo, description: newTask } : todo
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex w-100 align-items-center justify-content-center mt-5">
        <ul className="list-group w-50">
          {todos &&
            todos?.map((todo) => (
              <li
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  todo.finished ? 'todo-checked' : ''
                }`}
                key={todo.todo_id}
              >
                <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={todo.finished}
                  onChange={() => {
                    checkedTodo(todo.todo_id);
                  }}
                />

                {todo.description}

                <div className="d-flex" style={{ gap: 10 }}>
                  <span
                    className="badge badge-info badge-pill"
                    style={{ cursor: 'pointer' }}
                    title="Edit Todo"
                    data-toggle="modal"
                    data-target={`#id${todo.todo_id}`}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </span>
                  <span
                    className="badge badge-danger badge-pill"
                    style={{ cursor: 'pointer' }}
                    data-toggle="tooltip"
                    title="Delte todo"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>

                <EditTodo todo={todo} updateTodo={updateTodo} />
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ListTodos;
