import {Card, CardHeader, CardFooter, Image} from "@nextui-org/react";
import  {useEffect, useState} from "react";
import IconosDepor from "../../../assets/icons/iconosDepor"

function PlayerCompare({datosJug, datosComp}){
  const[infoPlayer, setInfoPlayer]= useState(datosJug);
  const[infoCompara, setInfoCompa]= useState(datosComp);

  useEffect(() => {
    setInfoPlayer(datosJug);
    setInfoCompa(datosComp);
}, [datosJug, datosComp]); 



return (
    <Card className="compare-player-card">
        <CardHeader className="compare-player-header"><IconosDepor deporte={infoPlayer.deporte} /></CardHeader>
        <Image removeWrapper alt={`${infoPlayer.nombre_depor} ${infoPlayer.apellidos_depor}`}
            className="compare-player-image" src={`/images/${infoPlayer.foto_perfil}`} />
        <CardFooter className="compare-player-footer">
            <div>
                <p className="compare-player-name"><span className="legend-dot" style={{ backgroundColor: infoPlayer.color }} />{infoPlayer.nombre_depor} {infoPlayer.apellidos_depor}</p>
                {infoCompara.map(entry => (
                    (entry.id_deportista == infoPlayer.id_deportista || entry.id_jugador == infoPlayer.id_deportista) &&
                    <p key={`${entry.id_deportista || entry.id_jugador}-${entry.conteo}`}>Veces: <b>{entry.conteo}</b></p>
                ))}
            </div>
        </CardFooter>
    </Card>
);
}

export default PlayerCompare;
