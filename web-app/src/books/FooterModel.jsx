import { useEffect, useState } from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import logo from "../assets/icons/logo-web.png"
import {Link} from "@nextui-org/react";


const FooterModel = () => {

    const [backgroundEffect, setBackgroundEffect]= useState("");
    function controlBackground(){
        const currentPage= window.location.pathname;
        if(currentPage=="/"){
            setBackgroundEffect({
                background: 'linear-gradient(to right, #213B4A, #000C18)',
                WebkitBackgroundClip: 'text',
                backdropFilter: 'blur(10px)'
            });
        }else{
            setBackgroundEffect({
                background: 'linear-gradient(to right, #213B4A, #000C18)'
            });
            
        }
    }

    useEffect(() => {
        controlBackground();
    }, []);

    return(
<div
    className="flex flex-row w-full h-footerHeight p-4 border-green-star-stats border-t-1 mt-52"
    style={{
        ...backgroundEffect
    }}
>
    <div className="flex-grow">
        <div className="flex flex-col text-green-star-stats gap-6 ml-7 items-start">
            <FaInstagram className="elementsFooter" />
            <FaLinkedin className="elementsFooter" />
            <FaGithub className="elementsFooter" />
        </div>
    </div>
    <div className="flex-grow ml-24">
        <div className="flex flex-col items-center text-green-star-stats gap-6">
                <Link href="/" className="text-green-star-stats">Inicio</Link>
            <div className="flex flex-row text-green-star-stats justify-center gap-6">
                <Link href="/comparar-jugador" className="text-green-star-stats">Comparar Jugador</Link>
                <Link href="/mi-panel-deportivo" className="text-green-star-stats">Mi panel deportivo</Link>
                <Link href="/titulos-jugador" className="text-green-star-stats">Títulos del Jugador</Link>
            </div>
            <Link href="/contacto" className="text-green-star-stats">Contacto</Link>
            <Link href="#" className="text-green-star-stats">Privacy Policy © 2024, StarStats</Link>
        </div>
    </div>
    <div className="flex-grow">
        <div className="flex flex-col text-green-star-stats mr-7 gap-3 items-end">
            <div className="flex flex-row items-center gap-2">
                <Link href="/">
                <img src={logo} alt="logo" className="h-16" />
                <p className="font-londrina text-starStats text-green-star-stats">StarStats</p>
                </Link>
            </div>
            <IoMailOutline className="elementsFooter" />
            <FaQuestionCircle className="elementsFooter" />
        </div>
    </div>
</div>
    )
}

export default FooterModel;