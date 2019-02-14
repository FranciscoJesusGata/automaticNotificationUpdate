$(document).ready(function () {

    $("#Texto").keydown(function(){
        var escrito = $("#Texto").val();
        var numCaracteres = escrito.length;
        var caracDisponibles = 140 - numCaracteres;
        if(numCaracteres <= 0){
            $("#Subir").attr("disabled", "true");
        }else if(numCaracteres > 0){
            $("#Subir").removeAttr("disabled");
        }
        $("#indicador").html("Te quedan "+caracDisponibles+" de 140 caracteres");
    });

    $("#Subir").click(function () {
        if ($("#Texto").val().length > 0){
            var datos = $("#Texto").val();
            $.ajax({
                type: "post",
                url: "../PHP/Subir_Publicacion.php",
                data: { texto: datos},
                dataType: "html",
                success: function () {
                    $("#Texto").val("");
                    $("#Subir").attr("disabled","true");
                    $("#indicador").html("Te quedan 140 de 140 caracteres");
                },
                error: function () { 
                    alert("No se pudieron subir los datos");
                }
            });
        } 
        else{
            $("#Subir").attr("disabled","true");
            $("#indicador").html("Te quedan 140 de 140 caracteres");
        }
    });
});