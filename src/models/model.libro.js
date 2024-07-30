import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Libro = sequelize.define('Libro', {
  libroId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fechaPublicacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  agregado_por: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meGusta: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  noMeGusta: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  agregado_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  modificado_por: {
    type: DataTypes.STRING,
  },
  modificado_en: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 't_libros',
  schema: 'gestion_libros',
  timestamps: false,
});

export default Libro;
