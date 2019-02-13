# automaticNotificationUpdate
Aplicación web que sirve para recibir notificaciones actualizadas cada x tiempo de forma automática por medio de PHP, SQL y AJAX.
### Dockerizar app
#### Dockerizar por comandos

Imagenes necesarias [`nginx:latest`](https://hub.docker.com/_/nginx), [`php:latest`](https://hub.docker.com/_/php) y [`mysql:5.7`](https://hub.docker.com/_/mysql) (Utilizo la versión 5.7  porque con el `mysqli_connect()` no está actualizado para la última versión.

Primero habrá que crear la base de datos a la que se conectará nuestra app:
```bash
docker run -d -p 3306:3306 --name db -e MYSQL_ROOT_PASSWORD=password mysql:5.7
```
Mapeamos el puerto 3306 porque es el que utiliza mysql para escuchar peticiones de un cliente externo.

Establecemos una variable de entorno llamada `MYSQL_ROOT_PASSWORD` para estableces una contraseña para root.

**Crear base de datos**

Para conectar con el contendor MySQL desde el host necesitaremos el siguiente comando de docker
```bash
docker exec -it db mysql -u root -p
```
El comado sirve para conectarse a la base de datos desde el usuario root, especificando que vas a pasar una contraseña.

El código SQL utilizado para esta app es:
```SQL
CREATE DATABASE notificaciones
CHARACTER SET utf8
COLLATE utf8_spanish_ci;

USE notificaciones;

CREATE TABLE comentarios(
    id int(3) AUTO_INCREMENT,
    text varchar(140) NOT NULL,
    fecha_publi timestamp DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT PK_Comentarios PRIMARY KEY(id)
);
```

**Crear servidor web**

Antes de levantar el contenedor NGINX necesitaremos un contendor PHP al que se conectará para ejecutar los documentos PHP. Para levantar el contendor PHP...
```bash
docker run -d --name php --link db:mysql_db -v /complete/centos/app-php:/app php:7-fpm
```
Conectamos el contenedor de PHP con el de MYSQL para que el programa encuentre el host en el archivo `/etc/hosts` y montamos un volumen que conecte nuestra carpeta con la carpeta /app donde tanto el contendor PHP como el contenedor NGINX van a buscar el código.

Como las funciones y métodos de MySQLi no son propios de PHP, sino que son extensiones, tedremos que instalarlas:
```bash
docker exec -ti php docker-php-ext-install
docker exec -ti mysqli docker-php-ext-enable mysqli
docker restart php
```

Ya instalador y configurado el contendor PHP pasamos a configurar el contenedor NGINX.

Para levantarlo ejecutamos:
```bash
docker run -d --name web --link php --link db:mysql_db -p 8080:80 -v /home/centos/app-php:/app -v /home/centos/app.conf:/etc/nginx/conf.d/app.conf nginx
```
Vale, esto tiene más miga que los anteriores comandos. Para empezar tenemos que conectar con el contendor de MySQL al que he llamado en el código `mysql_db`, lo que añadirá en documento de hosts la ip con el alias especificado. Tambien conectamos con el contenedor PHP que será el encargado de ejecutar el código PHP.

Montamos dos volúmenes, el primero, al igual que con el contendor PHP, se trata del código de nuestra aplicación. El segundo es la configuración del sitio web que NGINX carga en la configuración principal.

El documento puede llamarse se cualquier manera pero es importante que tenga la extensión `.conf`. Y este es el contenido del documento:
```bash
server {
    location / {
        root   /app;
        index  ./HTML/index.html;
    }

    location /comment.html{
        root   /app/HTML;
    }
    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # pass the PHP scripts to FastCGI server listening on php:9000

    location ~ \.php$ {
        root           /app;
        fastcgi_pass   php:9000;
        fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```
Una vez levantados los contenedores entramos en Firefox con la dirección http://127.0.0.1 o [127.0.0.1:8080](127.0.0.1:8080)