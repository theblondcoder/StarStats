import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import logo from "../assets/icons/logo-web.png"
import * as COLORS from '../consts/colors'

const NavbarRest = () => {
    return(
    <>
        <Navbar position="static" className="  w-full h-28 bg-transparent backdrop-none backdrop-blur-none backdrop-saturate-100 flex flex-row justify-start ">
            <div className="flex flex-row justify-start">
            <div>
                <NavbarBrand>
                <Link href="/">
                    <img src={logo} alt="logo" className="h-16" />
                    <p className="font-londrina text-starStats text-green-star-stats ">StarStats</p>
                </Link>
                </NavbarBrand>
                
            </div>
            <div className="ml-32 flex flex-col justify-center">
                <div>
                    <NavbarContent className="hidden sm:flex gap-8" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="/" style={{ color: COLORS.GREEN_STAR_STATS }} className="font-encode-bold">
                        Inicio
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/comparar-jugador" aria-current="page" style={{ color: COLORS.GREEN_STAR_STATS }} className="font-encode-bold">
                        Comparar Jugadores
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link style={{ color: COLORS.GREEN_STAR_STATS }} href="/titulos-jugador" className="font-encode-bold">
                        Títulos del jugador
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link style={{ color: COLORS.GREEN_STAR_STATS }} href="/mi-panel-deportivo" className="font-encode-bold">
                        Mi panel deportivo
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link style={{ color: COLORS.GREEN_STAR_STATS }} href="/contacto" className="font-encode-bold">
                        Contacto
                        </Link>
                    </NavbarItem>
                    </NavbarContent>
                </div>
                <div className="flex justify-center mt-3 ">
                    <div className="w-btn-navbar-rest border-t-1 border-green-star-stats"></div>
                </div>
            </div>
            <NavbarBrand justify="start" className="justify-start">
                <div className="justify-end">
                <NavbarContent justify="start">
                    <NavbarItem className="pl-10">
                    <Button as={Link} color="primary" href="/sign-in" variant="flat" className="bg-gray-star-stats text-green-star-stats h-h-btn-navbar w-w-btn-navbar">
                        Iniciar Sesión
                    </Button>
                    </NavbarItem>
                    <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat" className="bg-green-star-stats text-gray-star-stats h-h-btn-navbar w-w-btn-navbar">
                        Crear Cuenta
                    </Button>
                    </NavbarItem>
                </NavbarContent>
                </div>
            </NavbarBrand>
            </div>
        </Navbar>
</>
      
      
    )

}

export default NavbarRest;
