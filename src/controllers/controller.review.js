import Review from '../models/model.review.js';

// Obtener todas las reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
    attributes: [
        'id',
        'userId',
        'libroId',
        'contenido',
        'fechaPublicacion',
    ],
    });
    res.json(reviews);
  } catch (error) {
    console.error('Error al obtener reviews:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener una review por ID
const getReviewById = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const review = await Review.findByPk(reviewId, {
      attributes: ['id', 'userId', 'libroId', 'contenido', 'fechaPublicacion'],
    });

    if (!review) {
      return res.status(404).json({ error: 'Review no encontrada' });
    }

    res.json(review);
  } catch (error) {
    console.error('Error al obtener review por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear una nueva review
const createReview = async (req, res) => {
  const { userId, libroId, contenido, fechaPublicacion } = req.body;

  try {
    const nuevaReview = await Review.create({
    userId,
    libroId,
    contenido,
    fechaPublicacion: new Date(), 
    });

    res.status(201).json(nuevaReview);
} catch (error) {
    console.error('Error al crear review:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
};

// Eliminar un review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    
    if (!review) {
    return res.status(404).json({ error: 'Review no encontrada' });
    }

    await review.destroy();
    res.status(200).json({ message: 'Review eliminada exitosamente' });
} catch (error) {
    console.error('Error al eliminar review:', error);
    res.status(500).json({ error: error.message });
  } 
};

// Actualizar una review
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido } = req.body;
    const review = await Review.findByPk(id);
    if (!review) {
      res.status(404).json({ error: 'Review no encontrada' });
    } else {
      review.contenido = contenido;
      await review.save();
      res.json(review);
    }
  } catch (error) {
    console.error('Error al actualizar la review:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export { getAllReviews, getReviewById, createReview, deleteReview, updateReview };
