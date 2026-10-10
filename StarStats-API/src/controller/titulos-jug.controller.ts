import {pool} from '../middleware/db'
import { Request, Response, NextFunction } from 'express';

export async function datos_todos_depor(
    req: Request, 
    res: Response, 
    _next: NextFunction
) {
    try {

        const id = req.params.id;

        let query = `SELECT ID_DEPORTISTA, DEPORTE, FOTO_PERFIL, NOMBRES_API,  
        NOMBRE_DEPOR, APELLIDOS_DEPOR, ANIO_RETIRO, PAIS FROM todos_deportistas `;

        let queryParams: any[] = [];

        if (id && id !== "undefined") {
            // Consulta para un ID específico
            query += " WHERE ID_DEPORTISTA = ?";
            queryParams = [id];
        }

        const [rows] = await pool.query(query, queryParams);

        return res.status(201).json({ result: rows});
    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ message: "Error en la consulta"+ error });
    }
}

export async function depor_retirados(
    req: Request, 
    res: Response, 
    _next: NextFunction
) {
    try {
        const id = req.params.id;

        let query = `
            SELECT ID_DEPORTISTA, CIUDAD, FECHA_NACIMIENTO, 
            TIMESTAMPDIFF(YEAR, FECHA_NACIMIENTO, CURDATE()) AS EDAD, EXTREMIDAD_DOMINANTE  
            FROM DEPORTISTAS_RETIRADOS
        `;
        let queryParams: any[] = [];

        if (id && id !== "undefined") {
            // Consulta para un ID específico
            query += " WHERE ID_DEPORTISTA = ?";
            queryParams = [id];
        }

        const [rows] = await pool.query(query, queryParams);
        return res.status(201).json({ result: rows });
    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ message: "Error en la consulta: " + error });
    }
}



export async function tit_deportistas(
    req: Request, 
    res: Response, 
    _next: NextFunction
) {
    try {
        // Suponiendo que el ID del deportista se recibe en el cuerpo de la solicitud
        const id = req.params.id;
        
        let query = `
            SELECT ID_DEPORTISTA, COALESCE(SUM(resultado = 'g'), 0) AS TITULOS
            FROM resultados_anuales
        `;

        let queryParams: any[] = [];

        if (id && id !== "undefined") {
            // Consulta para un ID específico
            query += " WHERE id_deportista = ?";
            queryParams = [id];
        }

        query += " GROUP BY id_deportista";

        const [rows] = await pool.query(query, queryParams);

        return res.status(201).json({ result: rows });
    } catch (error) { 
        console.error("Error en la consulta:", error);
        return res.status(500).json({ message: "Error en la consulta: " + error });
    }
}
