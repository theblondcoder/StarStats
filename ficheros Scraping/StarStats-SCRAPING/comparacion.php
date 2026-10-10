<?php
$allowedOrigin = getenv("CLIENT_ORIGIN") ?: "http://localhost:5173";
header("Access-Control-Allow-Origin: ".$allowedOrigin);
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if(isset($_GET['deportista'])){

    $deportista= $_GET['deportista'];
    $modalidad= $_GET['modalidad'];
    $competicion=$_GET['competicion'];
    $url = "https://es.wikipedia.org/wiki/".$deportista;

    $html = file_get_contents($url);

    if ($html !== false) {
        $doc = new DOMDocument;
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_clear_errors();
    
        $xpath = new DOMXPath($doc);
        
        $resultados = [];


        if($modalidad=="partidos"){
            $queries = [
                "PARTIDOS" => "//table[contains(@class, 'wikitable') and contains(@style, 'text-align:center;')]//tr[td[1]//a[@title='".$competicion."'] and td[1]//span[@class='flagicon']]/td[last()-1]/text()",
                "SECOND" => "//table[contains(@class, 'wikitable') and contains(@style, 'text-align:center;')]//tr[td[1]//a[@title='".$competicion."'] and td[1]//span[@class='flagicon']]/th[last()]/text()",
                "TERCERO" => "//table[contains(@class, 'wikitable') and contains(@style, 'text-align:center;')]//tr[td[1]//a[@title='".$competicion."'] and td[1]//span[@class='flagicon']]/td[last()]/text()"
            ];
        $resultados = [
                'id_deportista' => $_GET['deportista']
            ];
            
            foreach ($queries as $titulo => $query) {
                $elements = $xpath->query($query);
                $temporal=[];
                foreach ($elements as $element) {
                    $partes = explode('-', $element->nodeValue);
                    $textos = trim($partes[0]);
                }
                $temporal[$titulo] = $textos;
                foreach ($temporal as $clave => $valor) {
                    if (!is_numeric($valor)) {
                        unset($temporal[$clave]);
                    }else{
                        $resultados['conteo']= $temporal[$clave];
                    }
                }
                
            }       
        }else if($modalidad=="titulos"){
            $queries = [
                "TITULOS"=> '//tr/td/a[contains(@title, "Anexo:'.$competicion.'") and text()="G"] | //tr/td/a[contains(@title, "Anexo:'.$competicion.'")]/b[text()="G"]',
            ];
            foreach ($queries as $titulo => $query) {
                $elements = $xpath->query($query);
                $conteo = $elements->length;
                $resultados[$titulo] = $conteo;
            }
    
            $resultados = array_merge(['id_deportista' => $_GET['deportista']] , ['conteo' => $conteo]);
    
        
        }else{
           echo "NINGUNA OPCION";
        }
        echo json_encode($resultados);
    }
}
