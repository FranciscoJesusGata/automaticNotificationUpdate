USE notificaciones;

CREATE TABLE comentarios(
    id int(3) AUTO_INCREMENT,
    text varchar(140) NOT NULL,
    fecha_publi timestamp DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT PK_Comentarios PRIMARY KEY(id)
);
