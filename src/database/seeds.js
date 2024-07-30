import sequelize from '../config/db.js';
import { Libro, Autor, Usuario, Voto } from '../models/main.js';

const sembrarBaseDeDatos = async () => {
  await sequelize.sync({ force: true });

  const autor = await Autor.create({ nombre: 'J.K.', apellidos: 'Rowling', estado: 'activo' });
  await Libro.create({
    nombre: 'Harry Potter y la piedra filosofal',
    descripcion: 'El inicio de la aventura de un joven mago...',
    fecha_publicacion: '1997-06-26',
    id_autor: autor.id,
    estado: 'activo',
  });
  await Usuario.create({
    nombre: 'John',
    apellidos: 'Doe',
    user: 'jdoe',
    correo_electronico: 'john@example.com',
    contrasena: 'password123',
    estado: 'activo',
  });
};

sembrarBaseDeDatos().then(() => {
  console.log('Base de datos sembrada.');
  process.exit(0);
}).catch(error => {
  console.error('Error sembrando la base de datos:', error);
  process.exit(1);
});
