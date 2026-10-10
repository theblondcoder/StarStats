import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import logo from "../assets/icons/logo-web.png"
import * as COLORS from '../consts/colors'


const NavbarInicio = () => {

    return(
      <>
  <Navbar position="static" className=" h-56 bg-transparent backdrop-none backdrop-blur-none backdrop-saturate-100 ">
    <div className="flex flex-col justify-center w-full gap-10 mt-8">
      <div className="flex ">
        <NavbarBrand>
          <Link href="/" className="ml-auto">
            <img src={logo} alt="logo" className="h-16" />
            <p className="font-londrina text-starStats text-green-star-stats ">StarS</p>
          </Link>
        </NavbarBrand>
        <NavbarBrand justify="end" className="-mr-24">
          <Link href="/" className="mr-auto">
            <p className="font-londrina text-starStats text-green-star-stats ">tats</p>
          </Link>
          <NavbarContent justify="end">
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
        </NavbarBrand>
      </div>
      <div className="">
        <NavbarContent className="hidden sm:flex gap-14" justify="center">
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
            <div className="flex justify-center mt-3">
              <div className="w-bar-navbar border-t-1 border-green-star-stats">
              </div>
            </div>  
      </div>
    </div>
  </Navbar>
</>
      
      
    )

}

export default NavbarInicio;