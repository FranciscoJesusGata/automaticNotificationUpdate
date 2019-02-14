FROM mysql:5.7
EXPOSE 3306
ENV MYSQL_ROOT_PASSWORD qrr0
ENV MYSQL_DATABASE notificaciones
COPY ./code/CreateTable.sql /docker-entrypoint-initdb.d/
