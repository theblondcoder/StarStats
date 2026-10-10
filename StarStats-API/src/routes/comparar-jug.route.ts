import express from 'express'
import { dataPlayerChart, competitions, playerCompetitions } from '../controller/comparar-jug.controller';

const router= express.Router();

router.get('/dataPlayer', dataPlayerChart);

router.get('/competitions', competitions);

router.post('/playerCompetitions', playerCompetitions);

export default router;
