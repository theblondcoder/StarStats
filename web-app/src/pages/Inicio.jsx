import NavbarInicio from "../books/NavbarInicio"
import SecondPart from '../components/main/inicioPage/Second-part'
import ThirdPart from '../components/main/inicioPage/Third-part'
import FooterModel from "../books/FooterModel"
import FirstPart from "../components/main/inicioPage/First-part-ini";
function Inicio(){

    
    
    return(
    <div className="background-layer">
        <NavbarInicio ></NavbarInicio>
        <div className="flex flex-col items-center justify-center gap-5 pl-56 pr-56 z-[-1]">
            <FirstPart></FirstPart>
            <div className="w-full flex flex-col items-start  pt-5 gap-8">
            <SecondPart></SecondPart>
            <ThirdPart></ThirdPart>
            </div>
        </div>
        <FooterModel></FooterModel>
    </div>
    )
}

export default Inicio; 