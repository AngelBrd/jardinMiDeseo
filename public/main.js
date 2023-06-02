AOS.init();

//SE DECLARAN LOS PRECIOS Y DESCRIPCIONES DE LOS PAQUETES 1 Y 2 CON SUS VARIACIONES PARA DESPUES LLENAR INPUTS

var precios = {
  "30": {
    "1": 6600,
    "2": 6800
  },
  "40": {
    "1": 6700,
    "2": 6950
  },
  "50": {
    "1": 6900,
    "2": 7080
  },
  "60": {
    "1": 7000,
    "2": 7210
  },
  "70": {
    "1": 7100,
    "2": 7340
  },
  "80": {
    "1": 7200,
    "2": 7470
  },
  "90": {
    "1": 7300,
    "2": 7600
  },
  "100": {
    "1": 7400,
    "2": 7730
  },
  "110": {
    "1": 7500,
    "2": 7820
  },
  "120": {
    "1": 7600,
    "2": 7990
  },
  "130": {
    "1": 7700,
    "2": 8120
  },
  "140": {
    "1": 7800,
    "2": 8240
  },
  "150": {
    "1": 7900,
    "2": 8380
  }
};

var descripciones = {
  "1": "Por 7 horas.\nJardín con área de asador, refrigerador, horno de microondas, baños mujeres, baños hombres.\nLona 10x15m.\nMesas con mantel.\nSillas.\n1 tablón con mantel (blanco) y sillas para mesa principal.",
  "2": "Por 7 horas.\nJardín con área de asador, refrigerador, horno de microondas, baños mujeres, baños hombres.\nLona 10x15m.\nMesas con mantel (blanco) y cubre mantel (color a elegir).\nSillas con fundas (blancas) y bandas (color a elegir).\n1 tablón con mantel y sillas para mesa principal."
};

//AQUI SE EJECUTA EL LLENADO AUTOMATICO DE LOS INPUTS

function actualizarPrecio() {
  var personas = document.getElementById("form_personas").value;
  var paquete = document.getElementById("paquete").value;
  
  var precio = precios[personas][paquete] || 0;
  var descripcion = descripciones[paquete] || "";
  
  document.getElementById("precio").value = precio;
  document.getElementById("descripcion").value = descripcion;
}

actualizarPrecio();

var preciosHorasExtra = {
  "0": 0,
  "1": 200,
  "2": 400,
  "3": 600,
  "4": 800
};

function actualizarPrecioHorasExtra() {
  var horasExtra = document.getElementById("horas_extra").value;
  var precioHorasExtra = preciosHorasExtra[horasExtra] || 0;
  
  document.getElementById("precio_horas_extra").value = precioHorasExtra;
  validarInputs();
}

//CREACION DE ALERTA PERSONALIZADA (pendiente)

//AQUI SE CARGA POR DEFECTO EL PRECIO DE HORAS EXTRA PARA PODER UTILIZAR EL BOTON DE CALCULAR TOTAL

window.addEventListener('DOMContentLoaded', function() {
  var horasExtraSelect = document.getElementById('horas_extra');
  var precioHorasExtraInput = document.getElementById('precio_horas_extra');
  var botonCalcular = document.getElementById('boton');

  horasExtraSelect.addEventListener('change', function() {
    actualizarPrecioHorasExtra();
  });

  horasExtraSelect.addEventListener('focus', function() {
    if (horasExtraSelect.value === '') {
      horasExtraSelect.value = '0';
      precioHorasExtraInput.value = '0';
    }
  });

  actualizarPrecioHorasExtra();

  botonCalcular.addEventListener('click', function() {
    calcularTotal();
  });
});

function validarInputs() {
  var precioPaquete = document.getElementById('precio').value;
  var precioHorasExtra = document.getElementById('precio_horas_extra').value;
  var botonCalcular = document.getElementById('boton');

  if (precioPaquete !== '' && precioHorasExtra !== '') {
    botonCalcular.disabled = false;
  } else {
    botonCalcular.disabled = true;
  }
}

function calcularTotal() {
  var precioPaquete = document.getElementById('precio').value;
  var precioHorasExtra = document.getElementById('precio_horas_extra').value;
  var total = parseInt(precioPaquete) + parseInt(precioHorasExtra);

  Swal.fire({
    title: "El total de su cotización es de $" + total,
    customClass: {
      confirmButton: "boton-alerta-total"
    },
    customClass: {
      popup: "alert-total"
    }
  });
  
}


//AQUI VALIDAMOS SI LA LONGITUD DEL NUMERO CELULAR ES DE 10

const inputNumero = document.getElementById("form_celular_cliente");

inputNumero.addEventListener("blur", function validarNumero() {
    var numero = inputNumero.value;
    if (numero.toString().length != 10) {
        Toastify({

            text: "El número debe tener 10 dígitos",
            duration: 4000,
            style:{
              background: "red"
            },
            className: "alert-celular"
            
            }).showToast();;
    }
});

//Validacion del input numero para que contenga 10 digitos y permitir el envio del formulario, se muestra succes en el error, porque el formulario si se envia pero no se detecta correctamente

const form = document.getElementById("formulario");
form.addEventListener("submit", function(event) {
  // Verificar la longitud del número de celular ingresado
  if (inputNumero.value.length !== 10) {
    // Evitar el envío del formulario
    event.preventDefault();
    // Mostrar una alerta o mensaje de error
    Toastify({
      text: "El número debe tener 10 dígitos",
      duration: 4000,
      style: {
        background: "red"
      },
      className: "alert-celular"
    }).showToast();
  } else {
    // Evitar el envío del formulario por defecto
    event.preventDefault();

    // Mostrar la alerta de confirmación
    Swal.fire({
      title: '¿Está segur@ que desea enviar su cotizacion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, enviar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Mostrar la alerta de carga
        const loadingAlert = Swal.fire({
          title: 'Enviando cotización...',
          text: 'Por favor, espere...',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false
        });

        // Enviar el formulario utilizando fetch
        fetch(form.action, {
          method: form.method,
          body: new FormData(form)
        }).then(function(response) {
          if (response.ok) {
            // Mostrar la alerta de éxito
            Swal.fire({
              title: 'Cotización Enviada',
              text: 'Te contactaremos vía Whatsapp',
              icon: 'success',
              allowOutsideClick: false
            }).then(function() {
              // Reiniciar la página
              location.reload();
            });
          } else {
            throw new Error('Envio de formulario');
          }
        }).catch(function(error) {
          // Mostrar la alerta de error
          Swal.fire({
            title: 'Cotización Enviada',
              text: 'Te contactaremos vía Whatsapp',
              icon: 'success',
              allowOutsideClick: false
          }).then(function() {
            // Reiniciar la página cuando se cierre la alerta de error
            location.reload();
          });
        }).finally(function() {
          // Ocultar la alerta de carga
          loadingAlert.close();
        });
      }
    });
  }
});

//Funcion para desplegar los distintos checkboxes con otros servicios

function toggleCheckboxes() {
  var container = document.getElementById("checkboxContainer");
  var isHidden = container.style.display === "none";
  container.style.display = isHidden ? "block" : "none";
  
  if (isHidden) {
    Toastify({
      text: "Se le enviará más información vía Whatsapp en caso de seleccionar otros servicios",
      duration: 5500,
      style:{
        background: "blue"
      },
      className: "alert-otros-servicios"

    }).showToast();
  }
}


