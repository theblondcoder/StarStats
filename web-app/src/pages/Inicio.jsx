import NavbarInicio from '../books/NavbarInicio';
import FirstPart from '../components/main/inicioPage/First-part-ini';
import SecondPart from '../components/main/inicioPage/Second-part';
import ThirdPart from '../components/main/inicioPage/Third-part';
import FooterModel from '../books/FooterModel';

function Inicio() {
    return (
        <div className="background-layer">
            <NavbarInicio />
            <main className="page-shell">
                <FirstPart />
                <SecondPart />
                <ThirdPart />
            </main>
            <FooterModel />
        </div>
    );
}

export default Inicio;
