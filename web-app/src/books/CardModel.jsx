import {Card, CardHeader, CardBody} from "@nextui-org/react";
import {Avatar, Button} from "@nextui-org/react";
import IconosDepor from "../assets/icons/iconosDepor"
import { FaTrophy } from "react-icons/fa";
import {useState, useEffect } from 'react'
import {printKeyOfValue} from "../utils/utility.functions"
import {flagsCodes} from "../utils/inicio.calls"

function CardModel({jugador}){
    
    const [codPaises, setCodPais]= useState({});
    const [edad, setEdad] = useState(null);

    function calcularEdad(){
        const meses = {
            enero: 0,
            febrero: 1,
            marzo: 2,
            abril: 3,
            mayo: 4,
            junio: 5,
            julio: 6,
            agosto: 7,
            septiembre: 8,
            octubre: 9,
            noviembre: 10,
            diciembre: 11
        };

        const partes = (jugador.FECHA_NACIMIENTO || '').match(/(\d+) de (\w+) de (\d+)/);
        if (!partes) {
            return null;
        }

        const dia = parseInt(partes[1], 10);
        const mes = meses[partes[2].toLowerCase()];
        const año = parseInt(partes[3], 10);

        const fechaNacimiento = new Date(año, mes, dia);
        const fechaActual = new Date();

        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        const mesActual = fechaActual.getMonth();

        if (mesActual < mes || (mesActual === mes && fechaActual.getDate() < dia)) {
            edad--;
        }

    return edad;
    }
    
    useEffect(() => {
        setEdad(calcularEdad());
        const codigoPaises = sessionStorage.getItem('codigoPaises');
        if (codigoPaises !== null) {
            setCodPais(JSON.parse(codigoPaises));
        } else {
            flagsCodes().then(data => {
                if (data) {
                    setCodPais(data);
                    sessionStorage.setItem('codigoPaises', JSON.stringify(data));
                }
            });
        }
    }, [jugador]);

    return (
        <Card className="player-card">
            <p className={`player-state ${jugador.ANIO_RETIRO ? 'player-state-retired' : 'player-state-active'}`}>
                {jugador.ANIO_RETIRO ? '● RETIRADO' : '● EN ACTIVO'}
            </p>
            <CardHeader className="player-card-header">
                <Avatar src={`/images/${jugador.FOTO_PERFIL}`} alt={jugador.NOMBRE_DEPOR} className="player-avatar" />
                <div className="player-icons">
                    <IconosDepor deporte={jugador.DEPORTE} />
                    {printKeyOfValue(codPaises, jugador.PAIS) && <img
                        src={`https://flagcdn.com/${printKeyOfValue(codPaises, jugador.PAIS)}.svg`}
                        alt={jugador.PAIS} width="25" />}
                </div>
            </CardHeader>
            <CardBody className="player-card-body">
                <h2 className="player-card-name">{jugador.NOMBRE_DEPOR} {jugador.APELLIDOS_DEPOR}</h2>
                <dl className="player-facts">
                    <div><dt>Ciudad</dt><dd>{jugador.CIUDAD || '—'}</dd></div>
                    <div><dt>Fecha de nacimiento</dt><dd>{jugador.FECHA_NACIMIENTO || '—'}</dd></div>
                    <div><dt>Edad</dt><dd>{edad === null ? '—' : `${edad} años`}</dd></div>
                    <div><dt>Extremidad dominante</dt><dd>{jugador.EXTREMIDAD_DOMINANTE || '—'}</dd></div>
                    <div><dt>Títulos profesionales registrados</dt><dd>{jugador.TITULOS ?? '—'}</dd></div>
                </dl>
                <Button className="player-card-button" endContent={<FaTrophy aria-hidden="true" />}>Ver títulos</Button>
            </CardBody>
        </Card>
    );
}

export default CardModel;
