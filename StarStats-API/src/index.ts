import "dotenv/config";
import express from 'express'
import CompararJugadoresRouter from './routes/comparar-jug.route'
import PanelDeportivoRouter from './routes/panel-depor.route'
import TitulosJugadorRouter from './routes/titulos-jug.route'
import InicioRouter from './routes/inicio.route'
import {pool} from './middleware/db'
import cors from 'cors'
import sessionConfig from './middleware/session'



const app = express();
const PORT = Number(process.env.PORT || 5900);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(sessionConfig);



app.use(express.json());

const corsOptions = {
    origin: CLIENT_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
  }

app.use(cors(corsOptions));

app.get('/ping', async(_, res) => {
    const[result]=await pool.query("SELECT * FROM TODOS_DEPORTISTAS")
    res.json(result)
})


app.use('/API-StarStats/inicio', InicioRouter);
app.use('/API-StarStats/comparar-jugadores', CompararJugadoresRouter);
app.use('/API-StarStats/panel-deportivo', PanelDeportivoRouter);
app.use('/API-StarStats/titulos-jugador', TitulosJugadorRouter);



app.listen(PORT, () =>{
})
