<?php
require_once __DIR__.'/wikipedia.php';
prepararRespuesta();

$deportista = $_GET['deportista'] ?? null;
$competicion = $_GET['competicion'] ?? null;
$modalidad = $_GET['modalidad'] ?? null;
if (!is_string($deportista) || trim($deportista) === '' || !is_string($competicion) || trim($competicion) === '' || !in_array($modalidad, ['partidos', 'titulos'], true)) {
    errorJson(400, 'Indica un deportista, una competición y una modalidad válida.');
}

try {
    $xpath = cargarWikipedia($deportista);
    $competicion = trim($competicion);
    if ($modalidad === 'titulos') {
        $enlaces = $xpath->query('//table[contains(@class,"wikitable")]//td//a[contains(@title,'.literalXPath('Anexo:'.$competicion).') and normalize-space(.)="G"]');
        $conteo = $enlaces->length;
        if (!$conteo && !$xpath->query('//a[@title='.literalXPath($competicion).']')->length) {
            errorJson(502, 'No se encontró la competición en Wikipedia.');
        }
    } else {
        // No depende de atributos style ni de iconos de bandera que pueden cambiar.
        $filas = $xpath->query('//table[contains(@class,"wikitable")]//tr[td[1]//a[@title='.literalXPath($competicion).']]');
        $conteo = null;
        foreach ($filas as $fila) {
            $celdas = $xpath->query('./td | ./th', $fila);
            foreach (array_reverse(iterator_to_array($celdas)) as $celda) {
                $texto = textoCelda($xpath, $celda);
                if (preg_match('/^(\d+)\s*[–−-]\s*\d+(?:\s|$)/u', $texto, $partidos)) {
                    $conteo = (int)$partidos[1];
                    break 2;
                }
            }
        }
        if ($conteo === null) {
            errorJson(502, 'Wikipedia no incluye un total de partidos reconocible para esta competición.');
        }
    }
    echo json_encode(['id_deportista' => $deportista, 'conteo' => $conteo], JSON_UNESCAPED_UNICODE);
} catch (Throwable $error) {
    error_log($error->getMessage());
    errorJson(502, 'No se pudo consultar Wikipedia. Vuelve a intentarlo más tarde.');
}
