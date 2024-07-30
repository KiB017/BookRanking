import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Voto = sequelize.define('Voto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: DataTypes.INTEGER,
  libroId: DataTypes.INTEGER,
  voto: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[0, 1, 2]] // Asegura que el voto solo pueda ser 0, 1 o 2
    },
  estado: DataTypes.STRING,
  agregado_por: DataTypes.STRING,
  agregado_en: DataTypes.STRING,
  modificado_por: DataTypes.STRING,
  modificado_en: DataTypes.STRING,
}, 
  tableName: 't_voto',
  schema: 'gestion_libros',
  timestamps: false,
});

export default Voto;
