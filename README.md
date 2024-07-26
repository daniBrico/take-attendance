# Aplicación de Gestión Académica

## Introducción

Esta aplicación está diseñada para el ámbito académico. Permite a los profesores gestionar tareas como tomar asistencia, realizar anuncios, llevar un registro de faltas, y descargar un archivo `.csv` con la información de asistencia.

## Características

+ **Asistencia en Tiempo Real**: Varias de las tareas, como tomar lista, ocurren en un tiempo inmediato, sin retrasos. Para cumplir con este requisito, utiliza WebSockets (a través de los módulos npm `socket-io` y `socket-io-client`) para la comunicación bidireccional en tiempo real.
+ **Registro y Autenticación**: Los usuarios deben registrarse y autenticarse como estudiantes o profesores para que cada uno acceda a las funcionalidades correspondientes.
+ **Interfaz Intuitiva**: Interfaz de usuario desarrollada con React.JS y Tailwindcss.
+ **Base de Datos**: Se ha creado una API con el modulo de Express que utiliza como base de datos MongoDB.

## Tecnologías Utilizadas

+ **Frontend**: React.JS, Tailwindcss.
+ **Backend**: Node.JS, MongoDB.
	+ **Módulos**: 
		+ **react-router-dom**: Para el manejo de rutas.
		+ **express**: Para la creación de la API.
		+ **mongoose**: Biblioteca que permite trabajar con MongoDB
		+ **react-hook-form**: Simplifica el proceso de uso de formularios.
		+ **jsonwebtoken**: Para autenticar y autorizar a los usuarios.
+ **Comunicación en Tiempo Real**: WebSockets (`socket-io` y `socket-io-client`)

## Estado del Proyecto

La aplicación está en desarrollo y se encuentra en una fase inicial. Hay muchas características por desarrollar y mejorar. Este documento refleja el planteo inicial del proyecto.
