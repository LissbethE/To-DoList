import React, { useState, useEffect, useRef } from 'react';
import { BsArrowDown, BsPlusCircleFill } from 'react-icons/bs';
import { RiCheckboxCircleLine } from 'react-icons/ri';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState(
    props.edit ? props.edit.description : ''
  );

  const inputRef = useRef(null);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleDescription = e => {
    e.preventDefault();
    setShowDescription(!showDescription);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      title: input,
      description,
      isDone: false,
      showDescription: false,
    });
    setInput('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="form ">
      {props.edit ? (
        <div className="form--update">
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="title"
            ref={inputRef}
            className="form__input form__edit form__description"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            name="description"
            className="form__input form__description"
          />

          <button onClick={handleSubmit} className="form__button">
            <RiCheckboxCircleLine />
          </button>
        </div>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="title"
            className="form__input"
            ref={inputRef}
          />
          <button onClick={handleDescription} className="form__button">
            <BsArrowDown />
          </button>
          <button onClick={handleSubmit} className="form__button">
            <BsPlusCircleFill />
          </button>
          {showDescription && (
            <textarea
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              className="form__input form__description"
            />
          )}
        </>
      )}
    </form>
  );
}

export default TodoForm;
