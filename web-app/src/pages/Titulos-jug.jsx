import FooterModel from '../books/FooterModel'
import NavbarRest from '../books/NavbarRest'
import { useParams } from "react-router-dom";
import ContenedorCartas from "../components/main/titulos-jugPage/Conte-Carta"



function TitulosJugador(){

    let { id } = useParams();




    return(
        <div className='background-layer-rest'>
            <NavbarRest></NavbarRest>
            <ContenedorCartas jugSelec={id}></ContenedorCartas>  
            <FooterModel></FooterModel>
            
        </div>
    )
}

export default TitulosJugador
