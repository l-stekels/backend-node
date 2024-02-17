import express from 'express';
import { getForecast } from '@controllers/forecast.controller';

const router = express.Router();
router.get('/', getForecast);

export default router;
