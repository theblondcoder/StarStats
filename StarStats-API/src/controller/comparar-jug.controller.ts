import { Request, Response, NextFunction } from 'express';
import { pool } from '../middleware/db';

declare module 'express-session' {
    interface Session {
        userData: any; 
        competitions:any;
        playerCompet:any;
    }
}

export async function dataPlayerChart(
    req: Request, 
    res: Response, 
    _next: NextFunction
) {
    try {
        if(req.session && req.session.userData){
            const { result: rows } = req.session.userData;
            return res.status(201).json({ result: rows });
           
        }else{
            let query= `SELECT * FROM TODOS_DEPORTISTAS`;


            const [rows] = await pool.query(query);
            req.session.userData={
                result:rows
            }
        
            return res.status(201).json({ result: rows});
        }
            

    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ message: "Error en la consulta"+ error });
    }
}


export async function competitions(
    req: Request, 
    res: Response, 
    _next: NextFunction
) {
    try {
        if(req.session && req.session.competitions){
            const { result: rows } = req.session.competitions;
            return res.status(201).json({ result: rows });
           
        }else{
            let query= `SELECT  ID_COMPETICION,NOMBRE  FROM COMPETICIONES_TENIS`;


            const [rows] = await pool.query(query);
            req.session.competitions={
                result:rows
            }
        
            return res.status(201).json({ result: rows});
        }
            

    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ message: "Error en la consulta"+ error });
    }
}

export async function playerCompetitions(
    req: Request, 
    res: Response, 
    _next: NextFunction
) {
    try {
            const { arrayReti, value1, value2 } = req.body;

            if (!arrayReti || !value1 || !value2) {
                return res.status(400).json({ error: 'Faltan parámetros' });
            }

            let query;
            if(value2=="titulos"){
                query= `SELECT id_deportista, COALESCE(SUM(CASE WHEN resultado = 'G' THEN 1 ELSE 0 END), 0) AS conteo
                        FROM resultados_anuales
                        WHERE id_deportista = ? AND id_competicion = ?
                        GROUP BY id_deportista`;
            }else if(value2=="partidos"){
                query= `SELECT id_jugador, partidos_ganados AS conteo
                        FROM estadisticas_jugadores
                        WHERE id_jugador = ? AND id_competicion = ?`;
                
            }else{
                return res.status(400).json({ error: 'Error en la Consulta!' });
            }
            
            
            const [rows] = await pool.query(query, [arrayReti, value1, value2]);

            return res.status(201).json({ result: rows });
    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ message: "Error en la consulta"+ error });
    }
}

