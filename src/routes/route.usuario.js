// src/routes/usuarios.js
import express from 'express';
import UsuarioController from '../controllers/controller.usuario.js';

const router = express.Router();
// Rutas para usuarios
router.post('/usuarios', UsuarioController.create); // Crear usuario
router.get('/usuarios', UsuarioController.findAll); // Obtener todos los usuarios
router.get('/usuarios/:id', UsuarioController.findOne);
router.put('/usuarios/:id', UsuarioController.update); // Actualizar usuario por ID
router.delete('/usuarios/:id', UsuarioController.delete); // Eliminar usuario por ID
router.post('/api/login', UsuarioController.login);
router.post('/api/register', UsuarioController.register);

export default router