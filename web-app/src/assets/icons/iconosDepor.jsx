import { IoTennisballOutline } from "react-icons/io5";


function IconosDepor({deporte}) {
    let icono;

    switch(deporte) {
        case 'Tenis':
            icono = <IoTennisballOutline className="w-6 h-6 text-green-star-stats" />;
            break;
        default:
            icono = <p className="text-size-card text-white">¡No se encontró el deporte!</p>;
    }

    return icono;
}

export default IconosDepor;