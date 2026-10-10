import { Request, Response, NextFunction } from 'express';
import { pool } from '../middleware/db';

export async function deporBarraBusqueda(
    _req: Request, 
    res: Response, 
    _next: NextFunction
) {
    try {
        const [rows] = await pool.query("SELECT ID_DEPORTISTA, FOTO_PERFIL, NOMBRE_DEPOR, APELLIDOS_DEPOR, PAIS FROM todos_deportistas");
        return res.status(201).json({ result: rows});
    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({ message: "Error en la consulta"+ error });
    }
}
