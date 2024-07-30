import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  agregado_por: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user:{
    type: DataTypes.STRING,
    allowNull:true,
  },
  agregado_en: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW ,
  },
  modificado_por: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  modificado_en: {
    type: DataTypes.DATE,
    allowNull: true,
  }}
  , {
  tableName: 't_usuarios',
  schema: 'gestion_libros',
  timestamps: false,
});

export { Usuario };