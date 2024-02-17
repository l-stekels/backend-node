import express from 'express';
import ForecastRouter from './forecast/forecast.router';

const router = express.Router();
router.use('/forecast', ForecastRouter);

export default router;
