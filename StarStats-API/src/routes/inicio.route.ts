
import { deporBarraBusqueda } from '../controller/inicio.controller';
import express from 'express'

const router= express.Router();

router.get('/barra-busqueda', deporBarraBusqueda);

export default router;