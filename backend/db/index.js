'use strict';

import { open } from 'sqlite';
import driver from 'sqlite3';

// Conectando a la base de datos
export const getDBConnection = async function () {
  try {
    const db = await open({
      filename: 'db.sqlite',
      driver: driver.Database,
    });

    if (!db) throw new TypeError(`DB Connection expected, got:${db}💥`);

    return db;
  } catch (error) {
    console.error(
      `💥There was an error trying to connect to the DBMS: ${error.message}💥`,
      error
    );
  }
};

// Creando la base de datos
export const initDB = async function () {
  try {
    const db = await getDBConnection();

    // Creando la tabla
    await db.exec(`
      CREATE TABLE IF NOT EXISTS todolist (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        isDone INTEGER DEFAULT 0
      )
    `);

    // Cerrando la base de datos
    await db.close();
  } catch (error) {
    console.error(
      `💥There was an error trying to init the DB: ${error.message}💥`,
      error
    );
  }
};
