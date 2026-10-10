
import {Card, CardBody, Image} from "@nextui-org/react";
import futureGraphs2 from "../../../assets/images/futureGraf2.png"


const SecondPart = () => {
    return(
        <>
        <div className="flex flex-row gap-36 mt-8">
                <div>
                    <Image
                        alt="Album cover"
                        className="object-cover w-72"
                        height={200}
                        shadow="md"
                        src={futureGraphs2}
                        
                    />
                </div>
                <div className="textsMainPage text-green-star-stats flex flex-col gap-20 pt-7" style={{textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'}}  >
                        <p>¿Quién ha acumulado más trofeos de Grand Slam?</p>
                        <p>¿Quién ha dominado los campeonatos mundiales?</p>
                        <p>¿Quién se ha destacado en múltiples disciplinas?</p>
                </div>
                
        </div>


        <div className="flex flex-row gap-10 mt-8">
            <Card
            isBlurred
            className="border-none  max-w-[630px] max-h-[270px] bg-green-star-stats p-4"
            shadow="sm"
            // style={{ backgroundColor: 'rgba(169, 169, 169, 0.8)' }}
            >
                
                <CardBody>
                    <div className="flex flex-col gap-6 md:gap-4 items-center justify-center">

                        <div className="flex flex-col col-span-6 md:col-span-8">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0">
                                <p className="textsMainPage text-gray-star-stats">
                                Ya seas un fanático del deporte, un apostador apasionado o 
                                simplemente un curioso del rendimiento  atlético. 
                                <br/><br/>
                                <span style={{color: 'black', textShadow: 'none'}}> ¡StarStats es tu destino para la comparación de títulos deportivos!</span>
                                <br/><br/>
                                Prepárate para sumergirte en un mundo de hazañas atléticas 
                                y descubrir quién se alza como el verdadero icono del deporte.
                                </p>
                                </div>            
                            </div>
                        </div>

                    </div>
                </CardBody>
            </Card>
            <Card
                isBlurred
                className="border-none  max-w-[280px] p-4"
                shadow="sm"
                style={{ backgroundColor: 'rgba(169, 169, 169, 0.8)' }}
            >
                
                <CardBody>
                    <div className="flex flex-col gap-6 md:gap-4 items-center justify-center">

                        <div className="flex flex-col col-span-6 md:col-span-8">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0">
                                <p className="textsMainPage text-green-star-stats">
                                Con nuestro motor de búsqueda intuitivo y fácil de usar, puedes analizar 
                                <span style={{color: 'black', textShadow: 'none'}}> estadísticas </span>detalladas y <span style={{color: 'black', textShadow: 'none'}}> datos</span> históricos para descubrir quién merece 
                                el título de<span style={{color: 'black', textShadow: 'none'}}> campeón supremo </span>. 

                                </p>
                                </div>            
                            </div>
                        </div>

                    </div>
                </CardBody>
            </Card>
        </div>
        {/* <div className="w-full flex justify-center pt-8">
            <p id="degradado" className="titlesMainPage" style={{textShadow: 'none'}}>¡La plataforma definitiva para evaluar el legado deportivo!</p>
        </div> */}
        <Card
                isBlurred
                className=" p-1 w-full flex justify-center mt-8 border-green-star-stats border-1"
                shadow="sm"
                style={{
                    background: 'linear-gradient(to right, #213B4A, #000C18)',
                    // WebkitBackgroundClip: 'text',
                    // WebkitTextFillColor: 'transparent'
                }}
            >
                <CardBody>
                    <div className="flex flex-col gap-6 md:gap-4 items-center justify-center ">
                        <p id="degradado" className="titlesMainPage" style={{textShadow: 'none'}}>¡La plataforma definitiva para evaluar el legado deportivo!</p>
                    </div>
                </CardBody>

        </Card>

        </>
    )

}
export default SecondPart;