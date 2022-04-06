import React, { Fragment, useState } from 'react';
import { apiRequest } from '../httpApi';
import EditTodo from './EditTodo';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    // e.preventDefault();
    try {
      const body = { description };

      const res = await apiRequest.post('/todos', body);
      setDescription('');
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Input Todo</h1>
      <form
        className="d-flex mt-4 justify-content-center"
        onSubmit={onSubmitForm}
      >
        <div className="input-group mb-3" style={{ width: '50%' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Any new todo task"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="submit"
              id="button-addon2"
            >
              Button
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default InputTodo;
