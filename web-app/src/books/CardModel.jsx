import {Card, CardHeader, CardBody} from "@nextui-org/react";
import {Avatar, Button} from "@nextui-org/react";
import IconosDepor from "../assets/icons/iconosDepor"
import { FaTrophy } from "react-icons/fa";
import {useState, useEffect } from 'react'
import {printKeyOfValue} from "../utils/utility.functions"

function CardModel({jugador}){
    
    const [codPaises, setCodPais]= useState("");

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

        const partes = jugador.FECHA_NACIMIENTO.match(/(\d+) de (\w+) de (\d+)/);
        if (!partes) {
            console.error('Formato de fecha no reconocido.');
            return 0;
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
        jugador.EDAD=calcularEdad();
        const codigoPaises = sessionStorage.getItem('codigoPaises');
        if (codigoPaises !== null) {
            setCodPais(JSON.parse(codigoPaises));
        }else setCodPais(jugador.PAIS)
    }, []);

    return(
<Card className=" flex flex-col justify-center items-center pt-4 pr-5 pl-5 pb-4 mt-3 border-1 border-green-star-stats w-card h-card" style={{background: 'linear-gradient(90deg, #000000, #c89116)'}}>
{(!jugador.ANIO_RETIRO || jugador.ANIO_RETIRO==null) ? <p className=" mb-1 font-bold text-green-card">ACTIVO</p> : <p className=" mb-1 font-bold text-red-600">RETIRADO</p> }    
    <CardHeader className="flex-row items-start justify-start gap-9 p-2 mx-4  border-1 border-green-star-stats rounded-xl" style={{background: 'linear-gradient(90deg, #000000, #737373)'}}>
        <Avatar src={`../../public/images/${jugador.FOTO_PERFIL}`} className="w-14 h-14 ml-3 border-1 border-green-star-stats bg-black" />
        <div className="flex flex-col gap-2 mt-[-2px] ml-4  items-center">
            <IconosDepor deporte={jugador.DEPORTE} />
            <img
                src={`https://flagcdn.com/${printKeyOfValue(codPaises,jugador.PAIS)}.svg`}
                width="30"
                alt="España"
                className="border-1 border-green-star-stats"
                style={{ fontSize: 'smaller' }}
            />
        </div>
    </CardHeader>
    <CardBody className="overflow-visible py-2 text-white flex flex-col gap-card-elements items-center ">
        <p className="text-sm">{jugador.NOMBRE_DEPOR+" "+jugador.APELLIDOS_DEPOR}</p>
        <div>
            <span className="card-containers">Ciudad: <b>{jugador.CIUDAD}</b></span>
            <span className="card-containers">Fecha de Nacimiento: <b>{jugador.FECHA_NACIMIENTO}</b></span>
            <span className="card-containers">Edad: <b>{jugador.EDAD} años</b></span>
            <span className="card-containers">Extremidad dominante: <b>{jugador.EXTREMIDAD_DOMINANTE}</b></span>
            <span className="card-containers">Titulos Profesionales: <b>{jugador.TITULOS}</b></span>
        </div>
        <Button className="bg-white h-6  text-orange-600 " endContent={<FaTrophy />}>
            Ver títulos
        </Button>    
    </CardBody>
</Card>
    )


}


export default CardModel; 
