import React, {useEffect, useState} from "react";
import {Input} from "@nextui-org/react";
import { RiSearchLine } from "react-icons/ri";
import {Select, SelectItem} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar} from "@nextui-org/react";
import {getCompetitions, getDataUserChart, getCompeRetir, getCompetiActi} from "../../../utils/comp-jug.calls"


function SearchComparerBar({setdatosJugador, setdatComJugador}) {
    const [seleccPlayer, setSeleccPlayer]= useState([]);
    const [values, setValues] = React.useState(new Set(["1"]));
    const [searchValue, setSearchValue] = useState('');
    const [value1, setValue1] = useState(new Set([]));
    const [value2, setValue2] = useState(new Set([]));
    const [touched1, setTouched1] = useState(false);
    const [touched2, setTouched2] = useState(false);
    const [userData, setUserData] = useState([]);
    const [competitions, setCompetitions]= useState([]);


    const modalidades = [
        { key: "titulos", label: "Más titulos ganados" },
        { key: "partidos", label: "Más partidos ganados" },
    ];

    const isValid1 = value1.size>0;
    const isValid2 = value2.size>0;

    const fetchDataPlayerChart = async () => {
        try {
          const data = await getDataUserChart();
          setUserData(data);
        } catch (error) {
          console.error("HAY EL SIGUIENTE ERROR: " + error);
        }
      }

      const fetchCompetitions = async () => {
        try {
          const data = await getCompetitions();
          setCompetitions(data);
        } catch (error) {
          console.error("HAY EL SIGUIENTE ERROR: " + error);
        }
      }

      const fetchCompetiRetir = async (arrayReti, value1, value2) => {
        try {
          const data = await getCompeRetir(arrayReti, value1, value2);
          return data
        } catch (error) {
          console.error("HAY EL SIGUIENTE ERROR: " + error);
        }
      }
      
        const fetchCompetiActi = async (jugador, compe, moda) => {
            try {
            const data = await getCompetiActi(jugador, compe, moda);
                return data
            }catch (error) {
            console.error("HAY EL SIGUIENTE ERROR: " + error);
            }
        }

    useEffect(() => {
        fetchDataPlayerChart()
        fetchCompetitions()
        
    }, []);

    function asignarColores(arrayUnido){
        let jugData= [...seleccPlayer];
        let comData= [...arrayUnido];
        let colores=["#949694", "#2c29b2","#b72426", "#9dc201", "#0d1628" ];
        let validacionCol=[true, true, true, true, true];
        
        for (const key in jugData) {
            let randomInt;
            do{
             randomInt = Math.floor(Math.random() * colores.length);
            }while(validacionCol[randomInt]==false);
            //para que esto funcione nunca puede haber mas personas que colores
            jugData[key].color= colores[randomInt];
            let matchingElement = comData.find(el => el.id_deportista === jugData[key].id_deportista || el.id_jugador===jugData[key].id_deportista);
            if (matchingElement) {
                matchingElement.color = colores[randomInt];
                comData= comData.filter(el=>el.id_deportista !== matchingElement.id_deportista || el.id_jugador!==matchingElement.id_jugador);
                comData.push(matchingElement);
                
            }

            validacionCol[randomInt]=false;
        }
       setdatosJugador(jugData);
       setdatComJugador(comData); //SE ENVIAN DE VUELTA LA INFO AL COMPONENTE PRINCIPAL
    }




    
    function generarComparacion() {
        let arrayReti = [];
        let arrayActi = [];
        let id_compe;
        let nombre_compe;
        let promesas = [];
    
        for (const compe of competitions) {
            if (compe.NOMBRE == [...value1.values()][0]) {
                id_compe = compe.ID_COMPETICION;
                nombre_compe = compe.NOMBRE;
            }
        }
    
        for (const player of seleccPlayer) {
            if (player.anio_retiro == null) {
                let promesa = fetchCompetiActi(player.nombres_api, nombre_compe, [...value2.values()][0])
                    .then(temp => {
                        temp.id_deportista = player.id_deportista;
                        arrayActi.push(temp);
                    })
                    .catch(error => {
                        console.error("Hubo un error:", error);
                    });
                promesas.push(promesa);
            } else {
                let promesa = fetchCompetiRetir(player.id_deportista, id_compe, [...value2.values()][0])
                    .then(temp => {
                        arrayReti.push(temp);
                    })
                    .catch(error => {
                        console.error("Hubo un error:", error);
                    });
                promesas.push(promesa);
            }
        }
    
        Promise.all(promesas).then(() => {
            const segundaDimension = arrayReti.map(elemento => elemento[0]); 
            const arrayUnido = [...arrayActi, ...segundaDimension];
            asignarColores(arrayUnido);
        }); 
        //ESTO ES MUY IMPORTANTE YA QUE SIRVE PARA ESPERAR A QUE SE ACABEN TODAS LAS PROMESAS PARA REALIZAR LA UNION DE ARRAYS
    }
    

    const renderUserListItem = (user) => (
        <ListboxItem key={user.id_deportista} textValue={user.nombre_depor}>
            <div className="flex gap-2 items-center">
                <Avatar alt={user.nombre_depor} className="flex-shrink-0" size="sm" src={`../../../../public/images/${user.foto_perfil}`} />
                <div className="flex flex-col">
                    <span className="text-small text-white">{user.nombre_depor} {user.apellidos_depor}</span>
                    <span className="text-tiny text-default-400">{user.deporte}</span>
                    <span className="text-tiny text-default-400">{user.pais}</span>
                </div>
            </div>
        </ListboxItem>
    );

    const topContent = React.useMemo(() => {
        const valuesArray = [...values]; // Convertir Set a Array
        const dataPlayer = [...userData];
        if (valuesArray.length === 0) {
            return null;
        }

        
        const playerMerged = valuesArray.map(item1 => {
            const item2 = dataPlayer.find(item2 => item2.id_deportista== item1);
            return { ...item2, ...item1 };
        });
        if(playerMerged.length===0){
            return null;
        }else{
            setSeleccPlayer(playerMerged);
        } 

        return (
            <ScrollShadow
                hideScrollBar
                className="w-full flex py-0.5 px-2 gap-1 text-white"
                orientation="horizontal"
            >
                
                {playerMerged.map((value) => (
                    value.nombre_depor !== undefined && value.apellidos_depor !== undefined ? (
                        <Chip key={value}>{`${value.nombre_depor} ${value.apellidos_depor}`}</Chip>
                    ) : null
                ))}
            </ScrollShadow>
        );
    }, [values]); // values, no valuesArray

    const filteredUsers = userData.filter(user =>
        user.nombre_depor.toLowerCase().startsWith(searchValue.toLowerCase()) || 
        user.apellidos_depor.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    return (
        <div className="max-h-[282px] max-w-[1000px] flex flex-col gap-3">
        <div className="flex flex-row gap-6">
            <div>
                <Input
                    label="Search"
                    isClearable
                    radius="lg"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClear={() => setSearchValue("")} 
                    classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "shadow-xl",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focus=true]:bg-default-200/50",
                            "dark:group-data-[focus=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    }}
                    placeholder="Type to search..."
                    startContent={<RiSearchLine size={18} />}
                />
            </div>
            <div>
                <Select
                    color="secondary"
                    label="Competición"
                    placeholder="Selecciona una competición"
                    description="Competición que se medirá en la gráfica"
                    errorMessage={ isValid1 || !touched1 ? "" : "Debes elegir una competicion"}
                    isInvalid={isValid1 || !touched1 ? false : true}
                    selectedKeys={value1}
                    className="min-w-10 text-white"
                    onSelectionChange={setValue1}
                    onClose={() => setTouched1(true)}
                >
                    {competitions.map(competition => (
                        <SelectItem key={competition.NOMBRE}>
                            {competition.NOMBRE}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div>
                <Select
                    color="secondary"
                    label="Modalidad"
                    placeholder="Selecciona una opción"
                    description="Parámetro por el que quieres comparar"
                    errorMessage={ isValid2 || !touched2 ? "" : "Debes elegir una competicion"}
                    isInvalid={ isValid2 || !touched2 ? false : true}
                    selectedKeys={value2}
                    className="max-w-xs text-white"
                    onSelectionChange={setValue2}
                    onClose={() => setTouched2(true)}
                >
                    {modalidades.map((modalidad) => (
                        <SelectItem key={modalidad.key}>
                            {modalidad.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div>
                <Button color="secondary" variant="shadow" size="lg" onClick={generarComparacion}>
                    Iniciar Comparación
                </Button>
            </div>
        </div>

        <div>
            <div  className="w-full max-w-full border-small bg-gray-600 bg-opacity-70  px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <Listbox
                color="secondary"
                topContent={topContent}
                classNames={{
                    base: "max-w-full",
                    list: "max-h-[300px] overflow-scroll",
                }}
        
                items={filteredUsers.length ? filteredUsers : userData}
                label="Assigned to"
                selectionMode="multiple"
                onSelectionChange={setValues} // Cambiar setValues a setArrayValues
                variant="flat"
            >
                {renderUserListItem}
            </Listbox>
            </div>
        </div>
    </div>
);
}
    


    
    

  export default SearchComparerBar;
