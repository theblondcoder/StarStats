import express from 'express'
import {datos_todos_depor, depor_retirados, tit_deportistas} from "../controller/titulos-jug.controller"

const router= express.Router();

router.get('/datos-todos-depor/:id', datos_todos_depor);

router.get('/depor_retirados/:id', depor_retirados);

router.get('/tit_deportistas/:id', tit_deportistas);


export default router;