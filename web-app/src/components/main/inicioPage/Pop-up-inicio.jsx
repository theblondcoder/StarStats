import { Listbox, ListboxItem, Avatar } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function PopUpInicio({ jugadoresDispo, codigPaisAsig }) {
    const navigate = useNavigate();
    return (
        <Listbox aria-label="Jugadores disponibles" emptyContent="No se encontraron jugadores.">
            {jugadoresDispo.map(jugador => (
                <ListboxItem key={jugador.ID_DEPORTISTA}
                    textValue={`${jugador.NOMBRE_DEPOR} ${jugador.APELLIDOS_DEPOR}`}
                    onClick={() => navigate(`/titulos-jugador/${jugador.ID_DEPORTISTA}`)}>
                    <div className="search-result">
                        <Avatar src={`/images/${jugador.FOTO_PERFIL}`} alt="" size="sm" />
                        <span className="search-result-name">{jugador.NOMBRE_DEPOR} {jugador.APELLIDOS_DEPOR}</span>
                        {codigPaisAsig[jugador.ID_DEPORTISTA - 1] && <img
                            src={`https://flagcdn.com/${codigPaisAsig[jugador.ID_DEPORTISTA - 1]}.svg`}
                            alt={jugador.PAIS} width="22" />}
                        <span className="search-result-arrow" aria-hidden="true">↗</span>
                    </div>
                </ListboxItem>
            ))}
        </Listbox>
    );
}

export default PopUpInicio;
