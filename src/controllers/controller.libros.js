import Libro from '../models/model.libro.js';

const getAllLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll({
      attributes: [
        'libroId',
        'titulo',
        'descripcion',
        'fechaPublicacion',
        'autor',
        'meGusta',
        'noMeGusta',
        'agregado_por',
        'agregado_en',
        'modificado_por',
        'modificado_en',
      ],
      // incluir otras opciones como where, order
    });
    res.json(libros);
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/*const LibroController = {
  async agregarLibro(req, res) {
    const { titulo, autor, descripcion, fechaPublicacion } = req.body;
    try {
      const libro = await Libro.create({ titulo, autor, descripcion, fechaPublicacion });
      res.status(201).json(libro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async votarLibro(req, res) {
    const { id } = req.params;
    const { meGusta } = req.body;
    try {
      const libro = await Libro.findByPk(id);
      if (libro) {
        if (meGusta) {
          libro.meGusta += 1;
        } else {
          libro.noMeGusta += 1;
        }
        await libro.save();
        res.json(libro);
      } else {
        res.status(404).json({ error: 'Libro no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};*/

async function getLibroById(req, res) {
  const libroId = req.params.id;

  try {
    const libro = await Libro.findByPk(libroId, {
      attributes: ['libroId', 'titulo', 'descripcion', 'fechaPublicacion', 'autor', 'meGusta', 'noMeGusta', 'agregado_por', 'agregado_en', 'modificado_por', 'modificado_en'],
    });

    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    res.json(libro);
  } catch (error) {
    console.error('Error al obtener libro por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }

};


async function createLibro(req, res) {
  const { titulo, descripcion, fechaPublicacion, autor, agregado_por, meGusta, noMeGusta } = req.body;

  console.log('Datos recibidos para crear libro:', req.body);

  try {
    const nuevoLibro = await Libro.create({
      titulo,
      descripcion,
      fechaPublicacion,
      autor,
      agregado_por,
      meGusta,
      noMeGusta,
      agregado_en: new Date(), 
    });

    console.log('Libro creado exitosamente:', nuevoLibro);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({ error: `Error interno del servidor: ${error.message}` });
  }
}


async function deleteLibro (req, res) {
  try {
    const { id } = req.params;
    const libro = await Libro.findByPk(id);
    
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await libro.destroy();
    res.status(200).json({ message: 'Libro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    res.status(500).json({ error: error.message });
  } 
}

async function updateLibro (req, res) {
  try {
    const { id } = req.params;
    const { titulo, autor, descripcion, modificado_por,modificado_en } = req.body;
    const libro = await Libro.findByPk(id);
    if (!libro) {
      res.status(404).json({ error: 'Libro no encontrado' });
    } else {
      libro.titulo = titulo;
      libro.descripcion = descripcion;
      libro.autor = autor;
      libro.modificado_por = modificado_por;
      libro.modificado_en = new Date()
      await libro.save();
      res.json(libro);
    }
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
export { getAllLibros, getLibroById, createLibro, deleteLibro, updateLibro };
