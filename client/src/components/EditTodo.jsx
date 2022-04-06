import React, { useState } from 'react';
import { apiRequest } from '../httpApi';

const EditTodo = ({ todo, updateTodo }) => {
  const [task, setTask] = useState(todo);

  const updateTask = async () => {
    try {
      await apiRequest.put('/todos/' + task.todo_id, { ...task });
      updateTodo(todo.todo_id, task.description);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control mt-3 mb-3"
                placeholder="Update todo description ..."
                value={task.description}
                name="description"
                onChange={(e) =>
                  setTask({ ...task, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={updateTask}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
