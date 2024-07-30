import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import libroRoutes from './routes/route.libros.js'; 
import usuarioRoute from './routes/route.usuario.js'; 
import votoRoute from './routes/route.voto.js'; 
import reviewRoute from './routes/route.review.js'; 
import sequelize from './config/db.js'; 
//const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api', libroRoutes, usuarioRoute, votoRoute, reviewRoute);
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4003; 

const iniciarServidor = async () => {
  try {
    //await sequelize.sync({ force: false });
    console.log('¡Base de datos conectada!');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
      sequelize.authenticate().then(() => console.log('Base de datos conectada!')).catch(err => console.error('Error al conectar a la base de datos:', err));
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

iniciarServidor();

export { app };
// src/main.js
/*import express from 'express';
import router from './routes/route.libros.js'; // Ajusta la ruta según sea necesario
import sequelize from './config/db.js'; // Ajusta la ruta según sea necesario

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

export default app;
*/