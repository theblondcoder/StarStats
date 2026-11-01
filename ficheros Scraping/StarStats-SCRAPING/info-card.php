<?php
require_once __DIR__.'/wikipedia.php';
prepararRespuesta();

$jugador = $_GET['deportista'] ?? null;
if (!is_array($jugador) || count($jugador) !== 2 || !ctype_digit((string)($jugador[0] ?? '')) || !is_string($jugador[1] ?? null) || trim($jugador[1]) === '') {
    errorJson(400, 'Se necesitan el identificador y el nombre del deportista.');
}

try {
    $xpath = cargarWikipedia($jugador[1]);
    $queries = [
        'FECHA_NACIMIENTO' => 'Fecha de nacimiento',
        'CIUDAD' => 'Lugar de nacimiento',
        'EXTREMIDAD_DOMINANTE' => 'Brazo hábil',
        'TITULOS' => 'Títulos de su carrera',
    ];
    $resultados = ['ID_DEPORTISTA' => (int)$jugador[0]];
    foreach ($queries as $campo => $etiqueta) {
        $celdas = $xpath->query('//table[contains(@class,"infobox")]//th[contains(normalize-space(.),'.literalXPath($etiqueta).')]/following-sibling::td[1]');
        $resultados[$campo] = $celdas->length ? textoCelda($xpath, $celdas->item(0)) : '';
    }
    if ($resultados['FECHA_NACIMIENTO'] === '') {
        errorJson(502, 'Wikipedia no devolvió una ficha de jugador reconocible.');
    }
    echo json_encode($resultados, JSON_UNESCAPED_UNICODE);
} catch (Throwable $error) {
    error_log($error->getMessage());
    errorJson(502, 'No se pudo consultar Wikipedia. Vuelve a intentarlo más tarde.');
}
