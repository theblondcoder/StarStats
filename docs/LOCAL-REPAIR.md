# Reparación local de StarStats — guía para la entrevista

## La arquitectura sigue siendo la misma

React 18 y NextUI muestran las páginas; Express con TypeScript consulta MySQL/MariaDB; PHP con DOMDocument y XPath extrae datos públicos de Wikipedia. Se mantiene la decisión original: datos de retirados desde la base de datos y datos de activos desde Wikipedia. Las rutas y el modelo relacional siguen siendo los del proyecto; la presentación se ha actualizado sin añadir dependencias.

## Qué cambió y cómo explicarlo

1. **Instalación y arranque:** Vite pasó de la versión 5 a la rama 6.4, que sigue recibiendo parches según su [política de soporte](https://vite.dev/releases). Se actualizaron dependencias compatibles y se retiraron librerías que no se importaban. React, Express y Tailwind conservan sus versiones principales.
2. **Tres servicios conectados:** Vite reenvía las peticiones a Express y PHP. El navegador utiliza una sola dirección y ya no necesita una instalación concreta de Apache. `npm run dev` simplemente arranca los tres programas existentes.
3. **Imágenes:** los archivos de `public/images` se solicitan como `/images/archivo.png`, que es la ruta pública correcta de Vite.
4. **Tarjetas:** los estados iniciales son listas; las fechas y títulos ausentes no provocan errores al llamar a expresiones regulares. Si Wikipedia falla, se conserva la ficha básica y se avisa al usuario. Las banderas se calculan cuando están disponibles ambos conjuntos de datos.
5. **Comparaciones:** la selección de jugadores se actualiza al cambiar los datos y deja de modificar el estado durante el render. No se puede iniciar sin competición, modalidad y jugadores. Una consulta sin resultados devuelve un recuento cero; un fallo de servicio muestra un error y no genera una comparación parcial.
6. **PHP:** se conserva XPath, pero sin depender de estilos inline ni iconos de bandera. Se añaden cabeceras JSON, identificación de la aplicación al consultar Wikipedia, tiempo máximo de espera y respuestas de error. Las referencias bibliográficas se eliminan antes de leer cifras.
7. **SQL:** los nombres de tabla coinciden en minúsculas con el esquema, para evitar diferencias entre Windows y Linux. El endpoint `/ping` devuelve un error controlado si la base de datos no está disponible.

## Cómo enseñarlo

### Cómo explicar la actualización visual

- **`web-app/src/index.css`:** reúne los colores en variables CSS y define espacios, tipografía, tarjetas y botones. Grid y Flexbox organizan las columnas; dos media queries adaptan el diseño al móvil.
- **`NavbarRest.jsx`:** una cabecera compartida recorre una lista pequeña de enlaces. `NavbarInicio.jsx` la reutiliza, evitando mantener dos cabeceras distintas.
- **`First-part-ini.jsx`:** conserva la búsqueda y las llamadas de datos. El desplegable se coloca con `position: absolute` dentro de un contenedor relativo, sin cálculos de posición en JavaScript.
- **Fichas y comparador:** las mismas propiedades y resultados se presentan con etiquetas más claras. La gráfica usa porcentajes para centrar el anillo y adaptarse a su contenedor.
- No se han añadido librerías, nuevos estados de negocio ni cambios en el backend para modificar el aspecto. Para cambiar los colores, basta editar las variables del principio de `index.css`.

```bash
npm run setup
# Configurar StarStats-API/.env y arrancar MySQL/MariaDB.
npm run db:init
npm run dev
```

En `http://localhost:5173`, buscar Roger Federer, abrir su ficha, consultar también Carlos Alcaraz y comparar ambos en una competición. La comparación mezcla datos SQL y datos de Wikipedia sin cambiar el flujo original.

## Límites reales del proyecto

- `database/schema.sql` contiene una **muestra histórica**, no todos los títulos o resultados reales. Por ejemplo, el título que muestra Federer corresponde a los resultados incluidos en esa muestra. No se han inventado ni completado sus estadísticas.
- El estado de retiro procede de la base de datos de demostración y puede estar desactualizado. La reparación no convierte esa muestra en un catálogo deportivo actualizado.
- El inicio de sesión, la creación de cuentas, el panel personal y el botón «Ver títulos» no tenían el flujo completo implementado. No se han desarrollado funciones nuevas para aparentar que existían.
- Wikipedia y las banderas requieren acceso a Internet. Un cambio futuro en Wikipedia puede necesitar otro ajuste de selectores; las tarjetas ahora soportan ese fallo.
- NextUI conserva su nombre y API para evitar una migración de componentes. Se aplicaron actualizaciones compatibles, sin forzar cambios mayores de React Router, Tailwind o de la biblioteca visual. Los avisos restantes de dependencias se deben revisar antes de un despliegue público; arrancar la demo local no equivale a una auditoría de producción.

## Si no arranca

- **Base de datos:** revisar el puerto, usuario y contraseña de `StarStats-API/.env`. MySQL Workbench por sí solo no es el servidor MySQL. `npm run db:init` no sobrescribe bases con tablas existentes.
- **PHP:** comprobar `php -m`; deben aparecer `dom` y `openssl`. En Windows puede usarse `PHP_BINARY` para indicar la ruta a `php.exe`.
- **Puerto ocupado:** utilizar los puertos del proyecto o actualizar conjuntamente el proxy de Vite y el servicio correspondiente. Vite usa `strictPort` para no cambiar silenciosamente de dirección.
- **Certificados de npm:** si aparece `UNABLE_TO_VERIFY_LEAF_SIGNATURE` en un equipo con certificados propios, con Node 24 puede usarse `$env:NODE_USE_SYSTEM_CA='1'` en PowerShell. Se mantienen las comprobaciones TLS.

## Comprobaciones

`npm run check` compila la API, ejecuta ESLint y genera la web de producción. PHP puede comprobarse con `php -l` sobre los tres archivos del scraping. Las pruebas de navegador de esta reparación cubrieron búsqueda, ficha de retirado, ficha activa, comparación mixta con gráfica y tarjetas con Wikipedia inaccesible.
