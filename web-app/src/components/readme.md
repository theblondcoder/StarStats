Aquí irán todos los componentes que que forman la web, es decir, todas el código de las páginas de forma independiente agrupados por subcarpetas que identifiquen la página a la que hacen referencia. Obviamente todos los archivos que esten en una subcarpeta tienen que tener hacer referencia a la misma parte de la web.

La idea es crear los componentes del proyecto lo mas cerca posible de en donde se va a usar

OTRA FORMA DE ORGANIZAR ESTA CARPETA: - Existe la posibilidad de mover el directorio de "books" dentro de esta carpeta de modo que quedaría como carpetas principales dentro del directorio, por un lado la de "books" que contendría todos los componentes reutilizable en las págians que no tienen porque tener relación entre si. Luego por el otro lado estaría una carpeta que contendrá todos lo que se indica en el primer párrafo.

Se puede plantear cada componente de la siguiente forma, dos ficheros por cada componente: - Uno con la parte lógica: funciones, etc. - Luego la vista, que pintará el HTML que enganchará todas las funciones que definimos en el fichero lógico
