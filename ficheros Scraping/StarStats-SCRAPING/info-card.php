<?php
$allowedOrigin = getenv("CLIENT_ORIGIN") ?: "http://localhost:5173";
header("Access-Control-Allow-Origin: ".$allowedOrigin);
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if(isset($_GET['deportista'])){

    $deportista= $_GET['deportista'][1];
    $url = "https://es.wikipedia.org/wiki/".$deportista;

    $html = file_get_contents($url);

    if ($html !== false) {
        $doc = new DOMDocument;
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_clear_errors();
    
        $xpath = new DOMXPath($doc);
        
        $queries = [
            'FECHA_NACIMIENTO' => '//th[contains(text(), "Fecha de nacimiento")]/following-sibling::td',
            'CIUDAD' => '//th[contains(text(), "Lugar de nacimiento")]/following-sibling::td',
            'EXTREMIDAD_DOMINANTE' => '//th[contains(text(), "Brazo hábil")]/following-sibling::td',
            'TITULOS' => '//th[contains(text(), "Títulos de su carrera")]/following-sibling::td'
        ];
        
        $resultados = [];
        
        foreach ($queries as $titulo => $query) {
            $result = $xpath->query($query);
        
            if ($result->length > 0) {
                $resultados[$titulo] = $result->item(0)->nodeValue;
            } else {
                $resultados[$titulo] = '';
            }
        }

        $resultados = array_merge(['ID_DEPORTISTA' => $_GET['deportista'][0]], $resultados);

        echo json_encode($resultados);
    }
}

?>
