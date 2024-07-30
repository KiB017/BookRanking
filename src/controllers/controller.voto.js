import Voto from '../models/model.voto.js';

// Obtener todos los votos

const getAllVotos = async (req, res) => {
  try {
    const votos = await Voto.findAll({
      attributes: [
        'id',
        'userId',
        'libroId',
        'voto',
      ],
    });
    console.log(req.body);
    res.json(votos);
  } catch (error) {
    console.error('Error al obtener votos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener un voto por IDP
const getVotoById = async (req, res) => {
  const votoId = req.params.id;

  try {
    const voto = await Voto.findByPk(votoId, {
      attributes: ['id', 'userId', 'libroId', 'voto'],
    });

    if (!voto) {
      return res.status(404).json({ error: 'Voto no encontrado' });
    }

    res.json(voto);
  } catch (error) {
    console.error('Error al obtener voto por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createVoto = async (req, res) => {
  const { userId, libroId, voto } = req.body;

  try {
    const nuevoVoto = await Voto.create({
      userId,
      libroId,
      voto,
    });

    res.status(201).json(nuevoVoto);
  } catch (error) {
    console.error('Error al crear voto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un voto
const deleteVoto = async (req, res) => {
  try {
    const { id } = req.params;
    const voto = await Voto.findByPk(id);

    if (!voto) {
      return res.status(404).json({ message: 'Voto no encontrado' });
    }

    await voto.destroy();
    res.status(200).json({ message: 'Voto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar voto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar un voto
const updateVoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { voto } = req.body;
    const votoExistente = await Voto.findByPk(id);
    if (!votoExistente) {
      res.status(404).json({ error: 'Voto no encontrado' });
    } else {
      votoExistente.voto = voto;
      await votoExistente.save();
      res.json(votoExistente);
    }
  } catch (error) {
    console.error('Error al actualizar el voto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export { getAllVotos, getVotoById, createVoto, deleteVoto, updateVoto };
