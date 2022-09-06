// Importamos el modulo de msql
const mysql = require('mysql');
const { promisify }= require('util');

const { database } = require('./keyvalues');// REcolecta la informacion de la propiedad databasekeys
// Crean una serie de hilos que se crean en secuencia
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused', err);
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});
// Promisify Pool Querys convertimos promesas en callbacks
pool.query = promisify(pool.query);

module.exports = pool;
