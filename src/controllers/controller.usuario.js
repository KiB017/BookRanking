import { Usuario } from '../models/model.usuario.js';
import bcrypt from 'bcrypt';


const UsuarioController = {

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const usuario = await Usuario.findOne({ where: { email } });

      if (usuario && await bcrypt.compare(password, usuario.password)) {
        // En este caso, estamos solo retornando un mensaje de éxito
        return res.json({ success: true, message: 'Login exitoso' });
      } else {
        return res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
      }
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async register(req, res) {
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const usuario = await Usuario.create({
        email,
        password: hashedPassword,
        // Otros campos
      });

      res.status(201).json({ success: true, message: 'Usuario creado' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { user, email, password, nombre } = req.body;
  
      // Imprimir los datos recibidos
      console.log('Datos recibidos:', req.body);
  
      // Verificar que todos los campos requeridos estén presentes
      if (!user || !nombre|| !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }
  
      const nuevoUsuario = await Usuario.create({
        user,
        email,
        nombre,
        password
      });
  
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el usuario.' });
    }
  },
  
  async findAll(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.json(usuario);
      }
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, correoElectronico, contrasena, user } = req.body;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        usuario.nombre = nombre;
        usuario.correoElectronico = correoElectronico;
        usuario.contrasena = contrasena;
        usuario.user = user;
        await usuario.save();
        res.json(usuario);
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        await usuario.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

export default UsuarioController;
