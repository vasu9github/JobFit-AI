import express from 'express';
import { analyzeResume, getAnalysisHistory } from '../controllers/resumeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/analyze', authMiddleware,  analyzeResume);
router.get('/history', authMiddleware,  getAnalysisHistory);

export default router;
