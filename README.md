# App de Blog

## Instalación

1. Clonar el repositorio
   ```https://github.com/Terasel/Blog-App-v2.git```
2. Crear el archivo '.env' en la carpeta raíz del repositorio. El archivo 'env_example.txt' contiene un ejemplo sobre la estructura que debería tener el archivo creado. En caso de dudas sobre la variable 'DATABASE_URL', visitar la página web https://www.prisma.io/docs/orm/overview/databases/mysql
3. Instalar las dependencias necesarias. Para el backend, abrir una terminal en la carpeta raíz del repositorio y ejecutar el comando ```npm install```. Para el frontend, abrir una terminal en la carpeta '\src\frontend' y ejecutar el comando ```npm install```
4. En la terminal del backend, ejecutar el comando ```npx prisma migrate dev``` para ejecutar todas las migraciones de Prisma y que la base de datos tenga el formato adecuado.
5. En la terminal del backend, ejecutar el comando ```npm run build``` para compilar el código a Javascript.
6. En la terminal del frontend, ejecutar el comando ```npm run build``` para su despliegue.

## Instrucciones de uso
1. Para levantar el servidor del backend, abrir una terminal en la carpeta raíz del repositorio y ejecutar el comando ```npm run start```. En caso de querer probar cada endpoint individualmente sin pasar por el frontend, el archivo 'api.http' contiene un listado de todos los endpoints (requiere la extensión 'REST Client' en Visual Studio Code). En este caso, se deberá levantar el servidor con el comando ```npm run dev```
2. Para levantar el servidor del frontend, abrir una terminal en la carpeta '\src\frontend' y ejecutar el comando ````npm run preview```. Por la terminal debería aparecer un enlace (por defecto http://localhost:4173/). Hacer ctrl+click en el enlace para abrirlo en una pestaña del navegador por defecto.
3. Para acceder a la documentación de la API, asegurarse de que el servidor backend está levantado y abrir una pestaña en el navegador con el url 'localhost:3000/docs'.
4. Para ejecutar las suites de testing, abrir la terminal del backend y ejecutar el comando ```npm run test``` (Nota: En ejecutarse los tests se eliminan todos los usuarios y blogs de la base de datos. Tener cuidado).
