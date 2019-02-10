$(document).ready(function () {

    function mostrarPublicaciones(datos){
        for(var i = 0; i < datos.length; i++){
            var html = "<div id='p"+datos[i]["id"]+"' class='publicacion' style='width: 100%'>";
            html+= datos[i]["text"];
            html+="<div id='fecha"+i+"' style='float: right'>"+datos[i]["fecha_publi"]+"</div>";
            html+="</div> <br/>";
            $("#contenido").prepend(html);
        }
    }

    function primeraLlamada(callback){
        $.ajax({
            type: "POST",
            url: "../PHP/Recopilar_Notificaciones.php",
            async: true,
            data: {},
            dataType: "json",
            success: function (response) {
                callback(response);
            },
            error: function(){
                console.error("Fallo en la llamada");
            }
        });
    }

    function update(fecha,callback){
        $.ajax({
            type: "POST",
            url: "../PHP/Recopilar_Notificaciones.php",
            async: true,
            data: {fecha: fecha},
            dataType: "json",
            success: function (response) {
                callback(response);
            }
        });
    }
    
    primeraLlamada (mostrarPublicaciones);
    //var posts = $('div[id^="fecha"]')
    //alert(posts[0].html("1"));
    //setInterval(update(fecha = $("#contenido:first-child"),mostrarPublicaciones),1000);
});