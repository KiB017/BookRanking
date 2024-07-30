import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: DataTypes.INTEGER,
  libroid: DataTypes.INTEGER,
  contenido: DataTypes.STRING,
  fecha_publicacion: DataTypes.STRING,
  estado: DataTypes.STRING,
  agregado_por: DataTypes.STRING,
  agregado_en: DataTypes.STRING,
  modificado_por: DataTypes.STRING,
  modificado_en: DataTypes.STRING,
}, {
  tableName: 't_review',
  schema: 'gestion_libros',
  timestamps: false,
});

export default Review;
