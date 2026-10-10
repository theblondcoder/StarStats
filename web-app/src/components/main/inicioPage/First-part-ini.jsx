
import {Image,Input} from "@nextui-org/react";
import imageExplanationCard from "../../../assets/images/explicacionCarta.png"
import {useState, useRef, useEffect } from 'react'
import { RiSearchLine } from "react-icons/ri";
import { usePopper } from 'react-popper';
import PopUpInicio from "./Pop-up-inicio";
import {searchBarPlayer, flagsCodes} from "../../../utils/inicio.calls"
import {printKeyOfValue} from "../../../utils/utility.functions"




function FirstPart(){

    const [codigosPais, setCodPais]= useState("");
    const [jugadores, setJugadores] = useState("");
    const [jugFiltra, setJugFiltra]= useState("No hay jugadores disponibles.");
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const popperRef = useRef(null);
  
    const { styles, attributes } = usePopper(inputRef.current, popperRef.current, {
      placement: 'bottom-start',
      modifiers: [
        { name: 'offset', options: { offset: [0, 10] } },
        {name: 'arrow', options: {padding: 5,} },
      ],
    });
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setInputValue(value);
      if (value.length > 0) {
        if(popperRef.current==null){
            popperRef.current = inputRef.current;
        }
        setPopoverOpen(true);
        filtrar(event.target.value);
      } else {
        setPopoverOpen(false);
      }
    };

    const filtrar =(terminoBusqueda)=>{
      let resultadosBusqueda= jugadores.filter((elemento)=>{
        if(elemento.NOMBRE_DEPOR.toString().toLowerCase().startsWith(terminoBusqueda.toLowerCase())
        || elemento.APELLIDOS_DEPOR.toString().toLowerCase().startsWith(terminoBusqueda.toLowerCase()) ){
          return elemento;
        }
      })
      setJugFiltra(resultadosBusqueda);
      
    }
  
    const handleBlur = () => {
      setTimeout(() => {
        setPopoverOpen(false);
      }, 100);
      setInputValue("")
    };  

    


    const fetchDataPlayer = async () => {
      try {
        const data = await searchBarPlayer();
        setJugadores(data);
      } catch (error) {
        console.error("HAY EL SIGUIENTE ERROR: " + error);
      }
    }

    
const fetchFlagsCodes = async () => {
  try {
    const data = await flagsCodes();
    setCodPais(data);
    sessionStorage.setItem('codigoPaises', JSON.stringify(data)); 
  } catch (error) {
    console.error("HAY EL SIGUIENTE ERROR: " + error);
  }
}


function asignarCodPais(){
  if(jugadores.length>0){
  let order_country_codes=[];
  for (let i = 0; i < jugadores.length; i++) {
    for (const key in jugadores[i]) {
      if(key==="PAIS"){
        let countryCode= printKeyOfValue(codigosPais, jugadores[i][key])
        order_country_codes.push(countryCode)
      }
    }
  }
  setCodPais(order_country_codes)
}

}



    
useEffect(()=>{
  asignarCodPais();
}, [jugadores])


    
useEffect(() => {
    fetchDataPlayer();
    fetchFlagsCodes();
    
}, []);
 

    return(
        <>
            <div className="flex justify-center">
                <div className="flex flex-wrap gap-4">
                    <div>
                    <Input
                        ref={inputRef}
                        classNames={{
                        base: "h-8",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-100/20 dark:bg-default-500/20",
                        }}
                        className="w-search-bar-navbar"
                        placeholder="Buscar Jugador"
                        size="sm"
                        startContent={<RiSearchLine size={18} />}
                        type="search"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onFocus={() => inputValue && setPopoverOpen(true)}
                    />
                    </div>
                    
                    {isPopoverOpen && (
                        <div ref={popperRef} style={{...styles.popper, zIndex: 999}} {...attributes.popper}>
                            <PopUpInicio jugadoresDispo={jugFiltra} codigPaisAsig={codigosPais}></PopUpInicio>
                        </div>
                    )}
                </div>
            </div>
            <p className="titlesMainPage text-green-star-stats pt-8">¡Mira los datos de tu deportista favorito!</p>
            <div className="flex justify-center">
                <Image
                    isZoomed
                    alt="NextUI Fruit Image with Zoom"
                    src={imageExplanationCard}
                    className="w-explanationCard h-explanationCard z-0 "
                    
                />
            </div>
        </>
    )
}

export default FirstPart; 
