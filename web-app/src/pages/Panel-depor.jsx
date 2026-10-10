import FooterModel from '../books/FooterModel'
import NavbarRest from '../books/NavbarRest'




function PanelDeportivo(){


    return(
        <div className='background-layer-rest'>
            <NavbarRest></NavbarRest>
            {/* <Prueba></Prueba> */}
            <FooterModel></FooterModel>
            
        </div>
    )
}

export default PanelDeportivo