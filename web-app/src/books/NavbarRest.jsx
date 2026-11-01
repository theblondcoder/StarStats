import logo from '../assets/icons/logo-web.png';

function NavbarRest() {
    const currentPage = window.location.pathname;
    const links = [
        ['/', 'Inicio'],
        ['/comparar-jugador', 'Comparar jugadores'],
        ['/titulos-jugador', 'Jugadores'],
        ['/mi-panel-deportivo', 'Mi panel'],
        ['/contacto', 'Contacto'],
    ];

    return (
        <header className="site-header">
            <div className="page-shell nav-content">
                <a href="/" className="brand" aria-label="StarStats, inicio">
                    <img src={logo} alt="" width="38" height="38" />
                    <span>Star<span className="brand-accent">Stats</span></span>
                </a>
                <nav className="nav-links" aria-label="Navegación principal">
                    {links.map(([href, label]) => (
                        <a key={href} href={href} className="nav-link"
                            aria-current={currentPage === href || (href === '/titulos-jugador' && currentPage.startsWith(href)) ? 'page' : undefined}>
                            {label}
                        </a>
                    ))}
                </nav>
                <div className="nav-actions">
                    <a href="/sign-in" className="button button-secondary">Iniciar sesión</a>
                    <a href="#" className="button button-primary">Crear cuenta</a>
                </div>
            </div>
        </header>
    );
}

export default NavbarRest;
