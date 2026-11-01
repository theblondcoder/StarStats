
import {Input} from "@nextui-org/react";
import {useState, useEffect } from 'react'
import { RiSearchLine } from "react-icons/ri";
import PopUpInicio from "./Pop-up-inicio";
import {searchBarPlayer, flagsCodes} from "../../../utils/inicio.calls"
import {printKeyOfValue} from "../../../utils/utility.functions"




function FirstPart(){

    const [codigosPais, setCodPais]= useState({});
    const [jugadores, setJugadores] = useState([]);
    const [jugFiltra, setJugFiltra]= useState([]);
    const [errorCarga, setErrorCarga] = useState('');
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setInputValue(value);
      if (value.length > 0) {
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
        setErrorCarga('No se pudieron cargar los jugadores. Comprueba que la API y la base de datos estén en marcha.');
      }
    }

    
const fetchFlagsCodes = async () => {
  try {
    const data = await flagsCodes();
    if (data) {
      setCodPais(data);
      sessionStorage.setItem('codigoPaises', JSON.stringify(data));
    }
  } catch (error) {
    console.error("HAY EL SIGUIENTE ERROR: " + error);
  }
}


const codigosAsignados = jugadores.map(jugador => printKeyOfValue(codigosPais, jugador.PAIS));


    
useEffect(() => {
    fetchDataPlayer();
    fetchFlagsCodes();
    
}, []);
 

    return(
        <section className="home-hero" aria-labelledby="hero-title">
            <div className="hero-copy">
                <p className="eyebrow">OTRA FORMA DE MIRAR EL TENIS</p>
                <h1 id="hero-title">El tenis,<br /><span>más allá del marcador.</span></h1>
                <p className="hero-description">Las trayectorias se construyen punto a punto. Explora a tus jugadores favoritos y descubre cómo se comparan sus resultados.</p>
                <div className="hero-actions">
                    <a href="/comparar-jugador" className="button button-primary">Comparar jugadores <span aria-hidden="true">↗</span></a>
                    <a href="/titulos-jugador" className="text-link">Ver jugadores <span aria-hidden="true">→</span></a>
                </div>
                <div className="hero-search">
                    <label htmlFor="player-search" className="search-label">¿A quién quieres conocer?</label>
                    <Input
                        id="player-search"
                        classNames={{
                            input: "hero-search-input",
                            inputWrapper: "hero-search-control",
                        }}
                        placeholder="Buscar Jugador"
                        size="lg"
                        startContent={<RiSearchLine size={18} />}
                        type="search"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onFocus={() => inputValue && setPopoverOpen(true)}
                    />
                    {isPopoverOpen && (
                        <div className="search-suggestions">
                            <PopUpInicio jugadoresDispo={jugFiltra} codigPaisAsig={codigosAsignados}></PopUpInicio>
                        </div>
                    )}
                </div>
                {errorCarga && <p role="alert" className="search-error">{errorCarga}</p>}
            </div>
            <div className="hero-visual">
                <div className="court-mark" aria-hidden="true" />
                <a href="/titulos-jugador/1" className="player-preview" aria-label="Ver la ficha de Carlos Alcaraz">
                    <div className="preview-top"><span>FICHA DE JUGADOR</span><span>↗</span></div>
                    <img src="/images/1.png" alt="Carlos Alcaraz" width="234" height="190" />
                    <h2>Carlos<br />Alcaraz</h2>
                    <div className="preview-meta"><span>España · Tenis</span><span>Ver trayectoria →</span></div>
                </a>
                <p className="hero-caption"><span aria-hidden="true">✳</span> Cada jugador tiene una historia.</p>
            </div>
        </section>
    )
}

export default FirstPart; 
