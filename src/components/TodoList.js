import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  /////////////////////////////

  // Leyendo
  const getToDo = async function () {
    const response = await fetch('http://localhost:3000/v1/to-doLists');
    const data = await response.json();

    console.log('Get: ', data);
    setTodos(data);
  };

  // Crear un to-doList
  const postToDo = async function (e) {
    const response = await fetch('http://localhost:3000/v1/to-doList', {
      method: 'POST',
      body: JSON.stringify(e),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log('Post: ', data, e);
  };

  // Actualizar la informacion de to-doList
  const patchToDo = async function (id, data) {
    const toDo = {
      id,
      title: data.title,
      description: data.description,
      isDone: data.isDone,
    };

    const response = await fetch(`http://localhost:3000/v1/to-doList/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(toDo),
      headers: { 'Content-Type': 'application/json' },
    });

    const dataJ = await response.json();
    console.log('Patch: ', dataJ);
  };

  // Eliminar to-doList
  const deleteToDo = async function (id) {
    const response = await fetch(`http://localhost:3000/v1/to-doList/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    console.log('Delete: ', data);
  };

  useEffect(() => {
    getToDo();
  }, []);

  ////////////////////////////

  useEffect(() => {
    //console.log(todos);
  }, [todos]);

  let isDescription;

  const addTodo = async todo => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    await postToDo(todo);
    //const newTodos = todos.toDoLists;

    // setTodos(newTodos);
    //console.log(...todos);

    getToDo();
  };

  const showDescription = (e, lista, todoId) => {
    isDescription = lista.description !== '' ? true : false;

    if (!isDescription) {
      e.target.style.pointerEvents = 'none';
      alert('📝Agregar Descripción.');
    } else {
      const clicked = e.target;

      if (!clicked.classList.contains('row__icon')) return;

      clicked.classList.toggle('active');

      let updatedTodos = todos.toDoLists.map(todo => {
        if (todo.id === todoId) {
          todo.showDescription = !todo.showDescription;
        }

        return todo;
      });

      setTodos({ ...todos, toDoLists: updatedTodos });
    }
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }

    setTodos(prev => {
      console.log('update: ', prev);
      return prev.toDoLists.map(item => (item.id === todoId ? newValue : item));
    });

    await patchToDo(todoId, newValue);
    getToDo();
  };

  const removeTodo = id => {
    const removedArr = todos.toDoLists.filter(todo => todo.id !== id);

    deleteToDo(id);
    setTodos({ ...todos, toDoLists: removedArr });
  };

  const completeTodo = id => {
    let updatedTodos = todos.toDoLists.map(todo => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });

    setTodos({ ...todos, toDoLists: updatedTodos });
  };

  return (
    <>
      <h1 className="heading-1 u-margin-bottom-medium">
        What's the Plan for Today?
      </h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
