
import {Card, CardBody, Image} from "@nextui-org/react";
import futureGraphs from "../../../assets/images/futurasGraf.png"


const SecondPart = () => {
    return(
    <>
    
   
        {/* <Card
            isBlurred
            className="border-none  max-w-[610px] "
            shadow="sm"
            style={{ backgroundColor: 'rgba(169, 169, 169, 0.8)' }}
            > */}
            {/* <CardBody >  */}
            <p className="titlesMainPage text-gray-star-stats">¡Analiza quién alcanza la gloria!</p>
            {/* </CardBody> */}
        {/* </Card> */}
        <Card
        isBlurred
        className="border-none  max-w-[610px] "
        shadow="sm"
        style={{ backgroundColor: 'rgba(169, 169, 169, 0.8)' }}
        >
            
            <CardBody>
                <div className="flex flex-col gap-6 md:gap-4 items-center justify-center p-4">

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                            <p className="textsMainPage text-green-star-stats">
                            Bienvenido a StarStats, donde la grandeza se pone a prueba. 
                            Con nuestra plataforma de comparación de títulos deportivos, 
                            puedes sumergirte en el emocionante mundo de los logros 
                            deportivos individuales y descubrir quién realmente reina en
                            su campo.
                            </p>
                            </div>            
                        </div>
                    </div>

                </div>
            </CardBody>
        </Card>
        <div className="relative col-span-6 md:col-span-4 pl-64 ">
            <Image
                alt="Album cover"
                className="object-cover w-histogram"
                height={200}
                shadow="md"
                src={futureGraphs}
                // width="100%"
                
            />
        </div>
        <div className="pl-80">
        <Card
        isBlurred
        className="border-none  max-w-[610px] "
        shadow="sm"
        style={{ backgroundColor: 'rgba(209, 232, 88)' }}
        >
            
            <CardBody>
                <div className="flex flex-col gap-6 md:gap-4 items-center justify-center p-4">

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                            <p className="textsMainPage text-gray-star-stats">
                            Explora una amplia gama de combinaciones entre campeonatos 
                            y deportistas para desentrañar quién ha tenido un rendimiento 
                            sobresaliente a lo largo de los años. 
                            <br/><br/>
                            Desde el <span style={{color: 'black', textShadow: 'none'}}>baloncesto
                            </span> hasta el <span style={{color: 'black', textShadow: 'none'}}> fútbol  
                            </span>, desde el <span style={{color: 'black', textShadow: 'none'}}> 
                            tenis </span> hasta el <span style={{color: 'black', textShadow: 'none'}}> golf </span>, 
                            nuestra herramienta te permite comparar y contrastar los 
                            <span style={{color: 'black', textShadow: 'none'}}> títulos </span>, 
                            <span style={{color: 'black', textShadow: 'none'}}> medallas </span> y 
                            <span style={{color: 'black', textShadow: 'none'}}> trofeos </span>
                            ganados por los deportistas más destacados. 
                            </p>
                            </div>            
                        </div>
                    </div>

                </div>
            </CardBody>
        </Card>
        </div>
    {/* </div> */}
    </>
    )

}
export default SecondPart;