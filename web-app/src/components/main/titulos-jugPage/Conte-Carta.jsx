import {Card, CardBody} from "@nextui-org/react";
import CardModel from "../../../books/CardModel"
import { useState, useEffect } from 'react';
import {getDatosTodDepor, getDeporRetirados, getTitDeportistas, getDatosCartaWeb} from '../../../utils/tit-jug.calls'

function ContenedorCartas({jugSelec}){

    const [controlEjecucion, setControlEjecucion]=useState(false);
    const[id, setId]= useState(jugSelec);
    const [jugDispo, setJugDispo]= useState("");
    const [manejoDatos, setManejoDatos]= useState([]);
    const [arrayPlayers, setArrayPlayers]= useState([]);
    const [playersActives, setPlayersActives]= useState([]);
    const [aux, setAux]= useState([]);
    const[resultado, setResultado]= useState([]);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState('');

    useEffect(() => { 
        fetchAllPlayers(id);
    }, []);

    useEffect(() => { 
        if (controlEjecucion) procesarJugReti();
    }, [controlEjecucion]);

    useEffect(() => { 
        setJugDispo(resultado)
    }, [resultado]);


    
    useEffect(() => {
            procesarDatos();
    }, [playersActives]); 
    
    useEffect(() => {
        if(manejoDatos.length>0){
            actualizarDatos();
        }
      }, [manejoDatos]); 

        const fetchAllPlayers = async (id) => {
            let temp=[]
            const help=[]
            let temp2=[]

            try {
            const data = await getDatosTodDepor(id);
            temp = data;
            if (!temp.length) {
                setErrorCarga('No se encontró el jugador solicitado.');
                setCargando(false);
                return;
            }
            } catch (error) {
                console.error("HAY EL SIGUIENTE ERROR: " + error);
                setErrorCarga('No se pudieron cargar los jugadores. Comprueba la API y la base de datos.');
                setCargando(false);
                return;
            }
            for (const player of temp) {
                if (player.ANIO_RETIRO === null) {
                    temp2[player.ID_DEPORTISTA] = [player.ID_DEPORTISTA, player.NOMBRES_API];
        
                if (player.ID_DEPORTISTA == id) {
                    setId(undefined);
                }
                }else{
                    help.push(player);
                }
            }

            setAux(help)
            temp2 = Object.entries(temp2).filter(([, value]) => value != null).reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
            setArrayPlayers(temp)
            setPlayersActives(temp2);
        }


        async function procesarDatos(){
            let temp2=playersActives;
            if(typeof(temp2)=="object" &&  Object.keys(temp2).length > 0){
                let control= [];
                for (const value of Object.values(temp2)) {
                    try {
                        const data = await getDatosCartaWeb(value);
                        if(data && typeof data === 'object'){
                            control.push(data);
                        }
                        } catch (error) {
                            console.error("HAY EL SIGUIENTE ERROR: " + error);
                            setErrorCarga('No se pudieron obtener algunos datos de Wikipedia. Se muestran los datos disponibles.');
                        }
                        
                }
                if(control.length>0){
                    setManejoDatos(control);
                } else {
                    procesarJugReti();
                }
                
            }else if(arrayPlayers.length>0){
                procesarJugReti();
            }
        }


        const actualizarDatos = () => {
            let temp3 = manejoDatos;
            if (temp3 !== undefined) {
                const nuevosDatos = temp3.map(value => {
                    const cleanDate = (value.FECHA_NACIMIENTO || '').split('(')[0].trim();
                    const titulos = (value.TITULOS || '').match(/\d+/g) || [];
                    const sumaTitulos = titulos.reduce((a, b) => a + Number(b), 0);
        
                    return {
                        ...value,
                        FECHA_NACIMIENTO: cleanDate,
                        EXTREMIDAD_DOMINANTE: (value.EXTREMIDAD_DOMINANTE || '').split(';')[0].trim(),
                        TITULOS: titulos.length ? sumaTitulos.toString() : null,
                    };
                });
                let comodin= arrayPlayers;
                const fusionarArrays = (arr1, arr2) => {
                    return arr1.map(obj1 => {
                        const obj2 = arr2.find(obj => obj.ID_DEPORTISTA == obj1.ID_DEPORTISTA);
                        if (obj2) {
                            return { ...obj1, ...obj2 };
                        }
                        return obj1; // o return null; para descartar si no hay coincidencia
                    }).filter(obj => obj !== null);
                };

                const resultado= fusionarArrays(comodin, nuevosDatos);

                setArrayPlayers(resultado);
                setControlEjecucion(true);
            }
        };



        const procesarJugReti = async () => {
            let temp4= aux;
            let arrayMerged;
            if(temp4.length>0){
                try{
                const data = await getDeporRetirados(id);
                arrayMerged = temp4.map(item1 => {
                    const item2 = data.find(item2 => item2.ID_DEPORTISTA === item1.ID_DEPORTISTA);
                    return { ...item1, ...item2 };
                });
                }catch (error) {
                    console.error("HAY EL SIGUIENTE ERROR: " + error);
                    arrayMerged = temp4;
                    setErrorCarga('No se pudieron cargar todos los datos de la base de datos.');
                }
                
                try {
                const data = await getTitDeportistas(id);
                temp4 = arrayMerged.map(item1 => {
                    const item2 = data.find(item2 => item2.ID_DEPORTISTA === item1.ID_DEPORTISTA);
                    return { ...item1, ...item2 };
                });
                } catch (error) {
                    console.error("HAY EL SIGUIENTE ERROR: " + error);
                    temp4 = arrayMerged;
                    setErrorCarga('No se pudieron cargar todos los títulos de la base de datos.');
                }

                const fusionarArrays = (arr1, arr2) => {
                    return arr1.map(obj1 => {
                        const obj2 = arr2.find(obj => obj.ID_DEPORTISTA == obj1.ID_DEPORTISTA);
                        if (obj2) {
                            return { ...obj1, ...obj2 };
                        }
                        return obj1; // o return null; para descartar si no hay coincidencia
                    }).filter(obj => obj !== null);
                };

                setResultado(fusionarArrays(arrayPlayers, temp4));
                
            }else if(arrayPlayers.length>0){
                setResultado(arrayPlayers);

            }else{
                setResultado("¡Ha habido un error con la carga de jugadores, por favor vuelva a intentarlo o contacte con el servicio técnico!");
            }
            setCargando(false);

            }


    return(
        <main className="page-shell players-section">
        <div className="page-heading">
            <p className="eyebrow">DENTRO Y FUERA DE LA PISTA</p>
            <h1 className="page-title">La historia de cada jugador.</h1>
            <p className="page-intro">Descubre sus orígenes, su trayectoria y los títulos registrados en su ficha.</p>
        </div>
        <Card
        className="players-panel"
        shadow="sm"
      
        >
            
            <CardBody className="players-panel-body">
                {errorCarga && <p role="alert" className="text-yellow-400 text-center">{errorCarga}</p>}
                <div className="player-grid">
                {
                    cargando ? <p>Cargando jugadores…</p> : Array.isArray(jugDispo) && jugDispo.length > 0 ? (
                        jugDispo.map((jugador, index) => (
                            <CardModel key={index} jugador={jugador} />
                        ))
                    ) : (
                        <p>¡Ha habido un error con la carga de jugadores, por favor vuelva a intentarlo o contacte con el servicio técnico!</p>
                    )
                }                  
                </div>
            </CardBody>
        </Card>
        </main>

    )
}


export default ContenedorCartas; 
