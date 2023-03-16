import express from 'express';
import { getDBConnection } from '../db/index.js';
import { validator } from '../Middlewares/validator.js';

export const todoRouter = express.Router();

// C.R.U.D => CREATE READ UPDATE DELETE

// Leyendo
todoRouter.get('/to-doLists', async function (request, response) {
  try {
    const db = await getDBConnection();
    const toDoLists = await db.all('SELECT * FROM todolist');

    response.send({ toDoLists });

    // Cerrando la base de datos
    await db.close();
  } catch (error) {
    response.status(500).send({
      message: '💥Something went wrong trying to get To-do 🙈',
      error,
    });
  }
});

// Crear un to-doList
todoRouter.post('/to-doList', validator, async function (request, response) {
  try {
    const { title, description } = request.body;

    console.log('Hola ', request.body);

    // Insertar la informacion a la tabla, utilizando la base de datos
    const db = await getDBConnection();
    const queryInfo = await db.run(`
      INSERT INTO todolist (title, description)
      VALUES(
        '${title}',
        '${description}'
      )
    `);

    response.send({ newTodo: { title, description } });

    // Cerrando la base de datos
    await db.close();
  } catch (error) {
    response.status(500).send({
      message: '💥Something went wrong trying to create a new To-do 🙈',
      error,
    });
  }
});

// Actualizar la informacion de to-doList
todoRouter.patch('/to-doList/:id', async function (request, response) {
  try {
    const { id } = request.params;
    const { title, description, isDone } = request.body;
    const db = await getDBConnection();
    const todoExists = await db.get(`SELECT * FROM todolist WHERE id = ?`, id);

    if (!todoExists)
      return response.status(404).send({ message: '💥To-DoList not found💥' });

    await db.run(
      `UPDATE todolist
        SET title = ?, description = ?, isDone = ?
        WHERE id = ?
      `,
      title || todoExists.title,
      description || todoExists.description,
      isDone !== undefined ? isDone : todoExists.isDone,
      id
    );

    response.send({ message: 'To-DoList Updated 🙌' });

    // Cerrando la base de datos
    await db.close();
  } catch (error) {
    response.status(500).send({
      message: '💥Something went wrong trying to update To-do 🙈',
      error,
    });
  }
});

// Eliminar to-doList
todoRouter.delete('/to-doList/:id', async function (request, response) {
  try {
    const id = request.params.id;
    const db = await getDBConnection();
    const todoExists = await db.run(`SELECT * FROM todolist WHERE id = ?`, id);

    if (!todoExists)
      return response.status(404).send({ message: '💥To-DoList not found💥' });

    const deleteInfo = await db.run(`DELETE FROM todolist WHERE id = ?`, id);
    response.send({ deleteInfo });

    // Cerrando la base de datos
    await db.close();
  } catch (error) {
    response.status(500).send({
      message: '💥Something went wrong trying to delete To-do 🙈',
      error,
    });
  }
});
