// src/config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('ranking _libros', 'postgres', 'c3bo11aycan3la', {
  host: '0.0.0.0',
  dialect: 'postgres',
  schema: 'gestion_libros' 
});

export default sequelize;
