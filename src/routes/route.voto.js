import express from 'express';
import { getAllVotos, getVotoById, createVoto, deleteVoto, updateVoto} from '../controllers/controller.voto.js';

const router = express.Router();

router.get('/votos', getAllVotos);
router.get('/votos/:id', getVotoById);
router.post('/votos', createVoto);
router.delete('votos/:id', deleteVoto);
router.put('/votos/:id', updateVoto)
export default router;
