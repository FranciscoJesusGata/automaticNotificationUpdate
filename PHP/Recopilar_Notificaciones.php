<?php
    function conectar(){
        $conexion = mysqli_connect('127.0.0.1','root',NULL,'notificaciones');
        if(!$conexion){
            echo "Error de depuración: ".mysqli_connect_error()." ".mysqli_connect_errno();
        }
        return $conexion;
    }
    function recopilar($conexion,$ult_publi){
        if ($ult_publi == NULL){
            $sql="SELECT *
            FROM comentarios";
        }
        else{
            $ult_publi = mysqli_real_string_escape($conexion,$ult_publi);
            $sql="SELECT *
            FROM comentarios
            WHERE fecha_publi > ".$ult_publi;
        }
        $result = mysqli_query($conexion,$sql);
        return $result;
    }
    $conexion = conectar();
    $ult_publi=NULL;
    if(isset($_POST['fecha'])){
        $ult_publi=$_POST['fecha'];
    }
    $recibido = recopilar($conexion,$ult_publi);

    if($recibido){
        $publicaciones = array();
        for($i = 0;$datos = mysqli_fetch_array($recibido); $i++){
            $publicaciones[$i] = $datos;
        }
        $enviar = json_encode($publicaciones);
        echo $enviar;
        /*echo "<br/>";
        print_r($publicaciones);*/
    }
?>