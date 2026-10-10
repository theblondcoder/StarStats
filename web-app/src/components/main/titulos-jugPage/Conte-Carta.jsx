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

    useEffect(() => { 
        fetchAllPlayers(id);
    }, []);

    useEffect(() => { 
        procesarJugReti();
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
            } catch (error) {
                console.error("HAY EL SIGUIENTE ERROR: " + error);
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
                        if(data!=""){
                            control.push(data);
                        }
                        } catch (error) {
                            console.error("HAY EL SIGUIENTE ERROR: " + error);
                        }
                        
                }
                if(control.length>0){
                    setManejoDatos(control);
                }
                
            }else if(arrayPlayers.length>0){
                procesarJugReti();
            }
        }


        const actualizarDatos = () => {
            let temp3 = manejoDatos;
            if (temp3 !== undefined) {
                const nuevosDatos = temp3.map(value => {
                    let edad = value.FECHA_NACIMIENTO.match(/\(([^)]+)\)/)[1];
                    edad = edad.match(/\d+/g).join('');
                    let index = value.FECHA_NACIMIENTO.indexOf('(');
                    let cleanDate = value.FECHA_NACIMIENTO.substring(0, index);
                    let titulos = value.TITULOS.match(/\d+/g);
                    let sumaTitulos = titulos.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        
                    return {
                        ...value,
                        EDAD: parseInt(edad, 10),
                        FECHA_NACIMIENTO: cleanDate,
                        EXTREMIDAD_DOMINANTE: value.EXTREMIDAD_DOMINANTE.split(';')[0].trim(),
                        TITULOS: sumaTitulos.toString(),
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
                }
                
                try {
                const data = await getTitDeportistas(id);
                temp4 = arrayMerged.map(item1 => {
                    const item2 = data.find(item2 => item2.ID_DEPORTISTA === item1.ID_DEPORTISTA);
                    return { ...item1, ...item2 };
                });
                } catch (error) {
                    console.error("HAY EL SIGUIENTE ERROR: " + error);
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

            }


    return(
        <div className="flex justify-center items-center min-h-screen  mx-auto mt-5">
        <Card
        isBlurred
        className="border-none  max-w-[57rem] min-w-[51rem]  bg-gray-star-stats  py-5"
        shadow="sm"
      
        >
            
            <CardBody>
                <div className="flex flex-row flex-wrap gap-7 md:gap-6 items-center justify-center p-4">
                {
                    Array.isArray(jugDispo) && jugDispo.length > 0 ? (
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
        </div>

    )
}


export default ContenedorCartas; 
