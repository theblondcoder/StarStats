import {useState} from "react";
import FooterModel from '../books/FooterModel'
import NavbarRest from '../books/NavbarRest'
import Comparacion from '../components/main/comparar-jugPage/Comparacion.jsx'
import PlayerCompare from "../components/main/comparar-jugPage/PlayerCompare.jsx"
import SearchComparerBar from '../components/main/comparar-jugPage/SearchComparerBar.jsx'

function CompararJugador(){

    const[datPlayer, setDatPlayer]= useState([]);
    const[datCompPlayer, setDatCompPlayer]= useState([]);

    return (
        <>
          <div className='background-layer-rest'>
            <NavbarRest></NavbarRest>
            <div className='flex flex-col gap-36'>
              <div className='mt-10  flex justify-center'>
                <SearchComparerBar setdatosJugador={setDatPlayer} setdatComJugador={setDatCompPlayer}></SearchComparerBar>
              </div>
              <div className='flex justify-end items-center min-h-screen mr-20 gap-80 mt-20'>
                <div className='flex flex-col gap-10'>
                  {datPlayer.length > 0 && datCompPlayer.length > 0 ? (
                    datPlayer.map((player, index) => (
                      <PlayerCompare key={index} datosJug={player} datosComp={datCompPlayer}></PlayerCompare>
                    ))
                  ) : (
                    <div className="text-white text-center">¡No hay datos disponibles¡ Inicia una comparación para visualizar datos.</div>
                  )}
                </div>
                {datPlayer.length > 0 && datCompPlayer.length > 0 ? (
                  <Comparacion datCompPlayer={datCompPlayer}></Comparacion>
                ) : (
                  <div className="text-white text-start">¡No hay datos disponibles¡ Inicia una comparación para visualizar datos.</div>
                )}
              </div>
            </div>
            <FooterModel></FooterModel>
          </div>
        </>
      );
}

export default CompararJugador
