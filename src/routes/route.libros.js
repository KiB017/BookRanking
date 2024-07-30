import express from 'express';
import { getAllLibros, getLibroById, createLibro, deleteLibro, updateLibro  } from '../controllers/controller.libros.js';

const router = express.Router();

// Rutas para libros
router.get('/libros', getAllLibros);
router.get('/libros/:id', getLibroById);
//router.post('/libros', agregarLibro);
router.post('/libros', createLibro);
router.delete('libros/:id', deleteLibro);
router.put('/libros/:id', updateLibro)
//router.post('/:id/voto', votarLibro);

export default router;

