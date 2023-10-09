# Examen Docker Swarm
# Instrucciones para ejecutar el servidor

Este servidor fue modificado debido a la falta de acceso a APIs públicas y gratuitas que proporcionen información sobre la temperatura de todas las ciudades del mundo. En su lugar, se hace uso de una API de georreferenciamiento argentina y se crea un archivo de texto que contiene las temperaturas de las provincias en grados centígrados, simulando así una API climatológica.

A continuación, se detalla el paso a paso para ejecutar el servidor:

## Paso 1: Acceder al directorio del servidor


```bash
cd server

cd server
```
```sh
npm i
```
```sh
cd ..
```

### Crear la imagen del servicio de Node:
- Para crear la imagen desde la raiz del proyecto debe ejecutar este comando en la consola: 
```sh
docker build -t node_sofi  ./server
```
- En caso que se encuentre en la posicion de la carpeta del servidor, el comando para crear la imagen es:
```sh
docker build -t node_sofi .
```

### Levantar los servicios:
Para levantar los servicios debe estar posicionado en la carpeta raiz del proyecto.
- Para levantar los servicios debe ejecutar el siguiente comando:
```sh
docker stack deploy -c servicios.yml services
```

## Ingresar al servicio
- Para consumir el servicio debe ingresar en la siguiente ruta:
```
http://localhost:3005
```