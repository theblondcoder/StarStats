<?php
// Helpers compartidos por los dos endpoints; se mantiene DOMDocument + XPath.
function prepararRespuesta(): void {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: '.(getenv('CLIENT_ORIGIN') ?: 'http://localhost:5173'));
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function errorJson(int $estado, string $mensaje): void {
    http_response_code($estado);
    echo json_encode(['error' => $mensaje], JSON_UNESCAPED_UNICODE);
    exit;
}

function cargarWikipedia(string $deportista): DOMXPath {
    $contexto = stream_context_create(['http' => [
        'user_agent' => 'StarStats/1.0 (https://github.com/theblondcoder/StarStats)',
        'timeout' => 15,
        'header' => "Accept: text/html\r\nConnection: close\r\n",
    ]]);
    $html = @file_get_contents('https://es.wikipedia.org/wiki/'.rawurlencode($deportista), false, $contexto);
    if ($html === false) {
        throw new RuntimeException('Wikipedia no está disponible.');
    }
    $documento = new DOMDocument();
    $anterior = libxml_use_internal_errors(true);
    $documento->loadHTML('<?xml encoding="UTF-8">'.$html);
    libxml_clear_errors();
    libxml_use_internal_errors($anterior);
    return new DOMXPath($documento);
}

function textoCelda(DOMXPath $xpath, DOMNode $celda): string {
    // Los números de las referencias no son estadísticas del jugador.
    foreach ($xpath->query('.//sup', $celda) as $referencia) {
        $referencia->parentNode->removeChild($referencia);
    }
    return trim(preg_replace('/\s+/u', ' ', $celda->textContent));
}

function literalXPath(string $texto): string {
    return "concat('".implode("',\"'\",'", explode("'", $texto))."','')";
}
