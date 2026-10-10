import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Inicio from "../../pages/Inicio";
import CompararJugador from "../../pages/Comparar-jug";
import Contacto from "../../pages/Contacto";
import PanelDeportivo from "../../pages/Panel-depor";
import SignIn from "../../pages/Sign-in";
import TitulosJugador from "../../pages/Titulos-jug";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/comparar-jugador" element={<CompararJugador />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/mi-panel-deportivo" element={<PanelDeportivo />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/titulos-jugador" element={<TitulosJugador />} />
          <Route path="/titulos-jugador/:id" element={<TitulosJugador />} />
          <Route path="/*" element={<Navigate to="/" />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
