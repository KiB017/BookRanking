import express from 'express';
import { getAllReviews, getReviewById, createReview, deleteReview, updateReview} from '../controllers/controller.review.js';

const router = express.Router();

router.get('/review', getAllReviews);
router.get('/review/:id', getReviewById);
router.post('/review', createReview);
router.delete('review/:id', deleteReview);
router.put('/review/:id', updateReview)
export default router;
