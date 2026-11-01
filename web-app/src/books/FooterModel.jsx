import { FaGithub } from 'react-icons/fa';
import logo from '../assets/icons/logo-web.png';

function FooterModel() {
    return (
        <footer className="site-footer">
            <div className="page-shell">
                <div className="footer-top">
                    <div>
                        <a href="/" className="brand"><img src={logo} alt="" width="32" height="32" /><span>Star<span className="brand-accent">Stats</span></span></a>
                        <p>Otra perspectiva del tenis.</p>
                    </div>
                    <nav className="footer-links" aria-label="Navegación del pie de página">
                        <a href="/">Inicio</a>
                        <a href="/titulos-jugador">Jugadores</a>
                        <a href="/comparar-jugador">Comparar jugadores</a>
                        <a href="/contacto">Contacto</a>
                    </nav>
                </div>
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} StarStats · Iván Baltanás</span>
                    <a href="https://github.com/theblondcoder/StarStats" target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> Ver el proyecto en GitHub <span aria-hidden="true">↗</span></a>
                </div>
            </div>
        </footer>
    );
}

export default FooterModel;
