import { useState } from 'react';
import FooterModel from '../books/FooterModel';
import NavbarRest from '../books/NavbarRest';
import Comparacion from '../components/main/comparar-jugPage/Comparacion';
import PlayerCompare from '../components/main/comparar-jugPage/PlayerCompare';
import SearchComparerBar from '../components/main/comparar-jugPage/SearchComparerBar';

function CompararJugador() {
    const [datPlayer, setDatPlayer] = useState([]);
    const [datCompPlayer, setDatCompPlayer] = useState([]);

    return (
        <div className="background-layer-rest">
            <NavbarRest />
            <main className="page-shell comparison-page">
                <div className="page-heading">
                    <p className="eyebrow">CARA A CARA</p>
                    <h1 className="page-title">Misma pista. Distintas historias.</h1>
                    <p className="page-intro">Elige los jugadores, la competición y qué quieres comparar. Los resultados, de un vistazo.</p>
                </div>
                <section className="comparison-panel" aria-label="Configurar comparación">
                    <SearchComparerBar setdatosJugador={setDatPlayer} setdatComJugador={setDatCompPlayer} />
                </section>
                {datPlayer.length > 0 && datCompPlayer.length > 0 ? (
                    <section className="comparison-results" aria-label="Resultados de la comparación">
                        <div className="comparison-players">
                            {datPlayer.map(player => (
                                <PlayerCompare key={player.id_deportista} datosJug={player} datosComp={datCompPlayer} />
                            ))}
                        </div>
                        <div className="chart-panel">
                            <h2 className="chart-title">Los resultados, en perspectiva.</h2>
                            <Comparacion datCompPlayer={datCompPlayer} />
                        </div>
                    </section>
                ) : (
                    <div className="empty-state">
                        <h2>Tu próximo cara a cara empieza aquí.</h2>
                        <p>Selecciona jugadores y una competición para descubrir cómo se comparan.</p>
                    </div>
                )}
            </main>
            <FooterModel />
        </div>
    );
}

export default CompararJugador;
