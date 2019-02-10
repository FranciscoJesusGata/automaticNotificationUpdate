<?php
    function conectar(){
        $conexion = mysqli_connect('127.0.0.1','root',NULL,'notificaciones');
        if(!$conexion){
            echo "Error de depuración: ".mysqli_connect_error()." ".mysqli_connect_errno();
        }
        return $conexion;
    }

    function subir($conexion, $texto){
        $texto = mysqli_real_escape_string($conexion, $texto);
        $sql = "INSERT INTO comentarios
                VALUES (NULL, '".$texto."', NULL)";
        $resultado = mysqli_query($conexion, $sql);
        return $resultado;
    }
    $tweet = $_POST['texto'];
    $conexion = conectar();
    $subido=subir($conexion,$tweet);

    if ($subido){
        echo "Publicación subida";
    }else{
        echo "Error en la subida /n";
        echo mysqli_error($conexion)." ".mysqli_errno($conexion);
    }
?>