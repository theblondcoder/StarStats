import { RiUserSearchLine, RiBarChartGroupedLine, RiTrophyLine } from 'react-icons/ri';

function SecondPart() {
    return (
        <section className="home-section" aria-labelledby="explore-heading">
            <div className="section-heading">
                <p className="eyebrow">EL JUEGO, DESDE OTRO ÁNGULO</p>
                <h2 id="explore-heading">Conoce. Compara. Descubre.</h2>
                <p>Acércate a los nombres, las trayectorias y los resultados que dan forma al tenis.</p>
            </div>
            <div className="feature-grid">
                <article className="feature-item">
                    <div className="feature-top"><RiUserSearchLine aria-hidden="true" /><span>01 / JUGADORES</span></div>
                    <h3>Más que un nombre.</h3>
                    <p>Explora las fichas de los jugadores: su origen, su trayectoria y los títulos registrados.</p>
                    <a href="/titulos-jugador" className="text-link">Conocer jugadores <span aria-hidden="true">↗</span></a>
                </article>
                <article className="feature-item">
                    <div className="feature-top"><RiBarChartGroupedLine aria-hidden="true" /><span>02 / COMPARACIONES</span></div>
                    <h3>Dos formas de ver el juego.</h3>
                    <p>Elige jugadores y una competición. Compara sus títulos o sus partidos ganados en una gráfica.</p>
                    <a href="/comparar-jugador" className="text-link">Crear una comparación <span aria-hidden="true">↗</span></a>
                </article>
                <article className="feature-item">
                    <div className="feature-top"><RiTrophyLine aria-hidden="true" /><span>03 / TRAYECTORIAS</span></div>
                    <h3>Cada época tiene su historia.</h3>
                    <p>Descubre perfiles de jugadores en activo y de quienes ya han dejado su huella en la pista.</p>
                    <a href="/titulos-jugador" className="text-link">Explorar las fichas <span aria-hidden="true">↗</span></a>
                </article>
            </div>
        </section>
    );
}

export default SecondPart;
