$(document).ready(function () {

    function imprimirDatos(datos) { 
        for(var i = 0; i < datos.length; i++){
            var html = "<div id='p"+datos[i][0]+"' class='publicacion'>";
            html += "<div class='texto'>"+datos[i][1]+"</div><br><br>"
            html += "<div id='fecha"+i+"' class='fecha'>"+datos[i][3]+"</div>";
            html += "</div><br>"
            $("#contenido").prepend(html);
        };
    }
    function primeraLlamada(){
        $.ajax({
            type: "POST",
            url: "../PHP/Recopilar_Notificaciones.php",
            async: true,
            data: {},
            dataType: "json",
            success: function (response) {
                var datos = response;
                imprimirDatos(datos);
                update();
            },
            error: function(){
                console.error("Fallo en la llamada");
            }
        });
    }

    function update(){
        setInterval(function(){
            var fecha = $(".fecha").first().text();
            if (fecha != undefined){
                $.ajax({
                    type: "POST",
                    url: "../PHP/Recopilar_Notificaciones.php",
                    timeout: 3000,
                    async: true,
                    data: {fecha: fecha},
                    dataType: "json",
                    success: function (response) {
                        var datos = response;
                        if (datos[0]){
                            imprimirDatos(datos);
                        }
                    },
                    error: function(){
                        console.error("Fallo de update");
                    }
                });
            }
        },3000);
    }
    primeraLlamada ();
});