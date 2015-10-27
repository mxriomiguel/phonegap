var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas);

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

saveButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Favor ingresar firma!");
    } else {
         //window.localStorage.removeItem("id_servicio");
         var imagen_firma = signaturePad.toDataURL("image/png");


         var archivoHoraFinal = "http://tuconstru.com/sati/grabar_firma.php";   


                $.post( archivoHoraFinal, { imagen_firma: imagen_firma, tipo_firma: tipo_firma,
                id_servicio: window.localStorage.getItem("id_servicio")
                })
                .done(function(respuestaServer) {
                    if(respuestaServer == 1){
                        alert("Firma de autorizador ingresada");
                        window.location="servicio_finalizado.html";
                    }
                    if(respuestaServer == 2){
                        alert("Firma de pasajero ingresada");
                        window.location="calificacion_servicio.html";
                    }
                              
        });
    return false;
    }
});
