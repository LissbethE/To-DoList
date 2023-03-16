import React, { useState } from 'react';
import TodoForm from './TodoForm';
import {
  RiCloseCircleLine,
  RiCheckboxCircleLine,
  RiArrowDownCircleLine,
} from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  showDescription,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const items = todos.toDoLists;

  if (!items) return;

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return items.map((todo, index) => (
    // <div>
    <div className={todo.isDone ? 'row complete' : 'row'} key={index}>
      <div className="row__item">
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          <h2 className="heading-2">{todo.title}</h2>
        </div>
        <div className="row__icon-box">
          <div className="row__icon" onClick={() => completeTodo(todo.id)}>
            <RiCheckboxCircleLine className="row__delete-icon" />
          </div>
          <div
            className="row__icon"
            onClick={e => showDescription(e, todo, todo.id)}
          >
            <RiArrowDownCircleLine className="row__arrow-icon" />
          </div>
          <div className="row__icon" onClick={() => removeTodo(todo.id)}>
            <RiCloseCircleLine className="row__delete-icon" />
          </div>
          <div
            className="row__icon"
            onClick={() =>
              setEdit({
                id: todo.id,
                value: todo.title,
                description: todo.description,
              })
            }
          >
            <TiEdit className="row__edit-icon" />
          </div>
        </div>
      </div>
      {todo.showDescription && (
        <div
          onClick={() => completeTodo(todo.id)}
          className="row__description paragraph"
        >
          <span className="row__text">Description:</span> {todo.description}
        </div>
      )}
    </div>
    // </div>
  ));
};

export default Todo;
