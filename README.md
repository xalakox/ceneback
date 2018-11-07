# ceneback

## Configuración
Se debe crear un archivo .env que debera contener una llave privada, ejemplo de contenido:
```
PRIVATE_KEY=secret
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
