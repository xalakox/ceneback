# CeneBack

Sistema para recibir evaluaciones y comentarios hacia magisterio y empleados
de institucion educativa.

## Servicios necesarios

### Correos de confirmación

Es necesario conter con una cuenta www.sendgrid.com, gratuita para hasta
100 correos diarios, neesaria el envío de correos de confirmacion;
en caso de no contar con una no sera posible mandar correos de confirmacion; sin embargo
para correr las pruebas se puede omitir y en la console se mostrara la ruta de un archivo con el
contenido del correo que se hubiera enviado.


## Configuración

### Archivo .env en raiz de ceneback
Se debe crear un archivo .env que debera contener una llave privada, ejemplo de contenido:
```
PRIVATE_KEY=secret
SENGRID=llave_api_de_sendgrid
EMAILSENDER=autor_del_correo_de_confirmacion
URLSISTEMA=url_del_sistema
```

## Inicio del sistema

Desde el repositorio de cenefront debera ejecutar 
```
docker-compose up
```
para levantar el ambiente de desarollo.

## Pruebas unitarias y de sistema (backend)
Para realizar las pruebas unitarias y de sistema, debera ejecutar
```
make test
```
