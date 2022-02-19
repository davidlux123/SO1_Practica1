# **Manual técnico**

## **Introducción** 

El practica consiste en una aplicacion de una calculadora sencilla desarrollada como una API REST en donde el micro servicio se de desarrollo en Golang y se ultilizo una base de datos con mongo y el desarrollo del front end se implemento con js con el framework de React

El proyecto se realizo en ubuntu-linux 20.04 S.0. Y los lenguajes Utilizados fueron: Java script, type script, Golang y sintaxis de docker y docker-compose.

## **Despliegue de la aplicacion**

El despliege de la aplicacion de realizo levantando tres contenedores de **Docker** uno de ellos es el front end situado en un contendor de nginx y dos contenedores para el back end, el siguiente es de Golang donde se aloja el micro serivicio y el ultimo es de mongo en donde se oloja el closter de mongo y un volumen en donde persiste la data.

para realizar el despligue de la aplicacion necesita realizar docker y docker-compose instalados.

2. **Levantar los contenedores como servicios:**

	Recordar que para que el servicio se levante posicionarse siempre en la misla ubicacion donde se encuentra el archivo docker-compose.yml

	```
	:~$ sudo docker-compose up -d
	```
3. **Para detener los servicios:**

	```
	:~$ sudo docker-compose down
	```
4.	**Dado que ejecutaremos el docker-compose como un deamon, no podremos 		observar el log que el contenedor provea, por lo tanto utilizaremos 	el siguiente comando para que logremos ver el log.**

	```
	:~$ docker logs -f davidlux123/frontend_so1pr1_201549059
	:~$ docker logs -f davidlux123/backend_so1pr1_201549059
	```

# Archivo docker-compose.yml
declara los nombres de los servicios, puertos, volúmenes y además define la ruta del Dockerfile, donde éste nos permitirá definir las funciones básicas de los contenedores.