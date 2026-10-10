
import {Listbox, ListboxItem} from "@nextui-org/react";
import {playerSearchBarPT} from '../../../propTypes/propTypes.inicio'
import {Avatar} from "@nextui-org/react";
import { useNavigate} from "react-router-dom";

const PopUpInicio = ({jugadoresDispo, codigPaisAsig}) => {

    PopUpInicio.propTypes={
        jugadoresDispo: playerSearchBarPT,
    }

    let navigate = useNavigate();
    const jugadores= jugadoresDispo;
    const codPaises= codigPaisAsig;


    function verCarta(id){
      navigate(`/titulos-jugador/${id}`);
    }

  

    return(
        <>
        <div className="arrow-before"></div>
        <div className="arrow-after"></div>
        <div className="w-pop-up-search-bar overflow-auto bg-negro-vineta h-32 p-7 border-small text-white px-1 py-2 rounded-small border-default-200 dark:border-default-100">
 
  <Listbox
    items={jugadores}
    aria-label="Dynamic Actions"
  >
  {jugadores.map((jugador, index) => (
  (() => {
    return (
      <ListboxItem
        key={index}
        color={"default"}
        className={"h-12 w-pop-up-search-bar"}
        onClick={()=>verCarta(jugador.ID_DEPORTISTA)}
      >
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="flex flex-row items-center justify-start gap-16">
            {Object.keys(jugador).map((key) => {
              if(key!=="ID_DEPORTISTA"){
                  if(key==="PAIS"){
                    return (
                      <div key={key} className="contents">
                      {codPaises && codPaises!=undefined ?(
                        <img
                          src={`https://flagcdn.com/${codPaises[jugador.ID_DEPORTISTA-1]}.svg`}
                          width="30"
                          alt={jugador[key]}/>
                      ):( <p>{jugador[key]}</p>)
                      }
                        <p className="w-16">{jugador[key]}</p>
                      </div>
                    )
                  }
                  if (key === 'FOTO_PERFIL') {
                    return  <Avatar key={key} isBordered  color="default" src={`../../../../public/images/${jugador[key]}`} className="m-1" />
                  } else {
                    return <p key={key} className="w-16">{jugador[key]}</p>;
                  }
              }
            })}
          </div>
        </div>
      </ListboxItem>
    );
  })()
))}
</Listbox>
        
           
        </div>
        </>
    )
}


export default PopUpInicio;
