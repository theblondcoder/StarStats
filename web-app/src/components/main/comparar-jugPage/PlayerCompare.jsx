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



return(

    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5 bg-cyan-950">
    <CardHeader className="absolute z-10 top-1 flex-col items-start">
      <IconosDepor deporte={infoPlayer.deporte} />
    </CardHeader>
    <Image
      removeWrapper
      alt="Card example background"
      className="z-0 w-48 h-full  object-cover"
      src={`../../../../public/images/${infoPlayer.foto_perfil}`}
    />
    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-center ">
      <div>
        <p className="text-black text-tiny font-bold text-center">{`${infoPlayer.nombre_depor} ${infoPlayer.apellidos_depor}`}</p>
        <div className="flex items-center">
          <p className="mr-2">Color:</p>
          <div className={`w-20 h-4 rounded-md`} style={{ backgroundColor: infoPlayer.color }}></div>
        </div>
        {infoCompara.map((entry) => (
          (entry.id_deportista == infoPlayer.id_deportista || entry.id_jugador == infoPlayer.id_deportista) &&
            <p key={`${entry.id_deportista || entry.id_jugador}-${entry.conteo}`} className="text-tiny text-center">Veces: <b>{entry.conteo}</b></p>
        ))}
      </div>
    </CardFooter>
     </Card>
)
}

export default PlayerCompare;
