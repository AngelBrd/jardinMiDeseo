AOS.init();

//SE DECLARAN LOS PRECIOS Y DESCRIPCIONES DE LOS PAQUETES 1 Y 2 CON SUS VARIACIONES PARA DESPUES LLENAR INPUTS

var precios = {
  "30": {
    "1": 5200,
    "2": 6600,
    "3": 6800
  },
  "40": {
    "1": 5300,
    "2": 6700,
    "3": 6950
  },
  "50": {
    "1": 5400,
    "2": 6900,
    "3": 7080
  },
  "60": {
    "1": 5500,
    "2": 7000,
    "3": 7210
  },
  "70": {
    "1": 5600,
    "2": 7100,
    "3": 7340
  },
  "80": {
    "1": 5700,
    "2": 7200,
    "3": 7470
  },
  "90": {
    "1": 5800,
    "2": 7300,
    "3": 7600
  },
  "100": {
    "1": 5900,
    "2": 7400,
    "3": 7730
  },
  "110": {
    "1": 6000,
    "2": 7500,
    "3": 7820
  },
  "120": {
    "1": 6100,
    "2": 7600,
    "3": 7990
  },
  "130": {
    "1": 6200,
    "2": 7700,
    "3": 8120
  },
  "140": {
    "1": 6300,
    "2": 7800,
    "3": 8240
  },
  "150": {
    "1": 6400,
    "2": 7900,
    "3": 8380
  }
};

var descripciones = {
  "1": "El Jardin incluye: \n• Uso por 7 horas.\n• Jardín con área de asador, refrigerador, horno de microondas, baños mujeres, baños hombres.",
  "2": "El Paquete 1 incluye: \n• Uso por 7 horas.\n• Jardín con área de asador, refrigerador, horno de microondas, baños mujeres, baños hombres.\n• Lona 10x15m.\n• Mesas con mantel.\n• Sillas.\n• 1 tablón con mantel (blanco) y sillas para mesa principal.",
  "3": "El Paquete 2 incluye: \n• Uso por 7 horas.\n• Jardín con área de asador, refrigerador, horno de microondas, baños mujeres, baños hombres.\n• Lona 10x15m.\n• Mesas con mantel (blanco) y cubre mantel (color a elegir).\n• Sillas con fundas (blancas) y bandas (color a elegir).\n• 1 tablón con mantel y sillas para mesa principal."
};

//AQUI SE EJECUTA EL LLENADO AUTOMATICO DE LOS INPUTS

function actualizarPrecio() {
  var personas = document.getElementById("form_personas").value;
  var paquete = document.getElementById("paquete").value;
  
  var precio = "";
  if (personas && paquete) {
    precio = precios[personas] ? precios[personas][paquete] || "Precio del Paquete" : "Precio del Paquete";
  }
  
  var descripcion = descripciones[paquete] || "";
  
  document.getElementById("precio").value = precio;
  document.getElementById("descripcion").value = descripcion;
}


function llenarPrecioHorasExtra(seleccion) {
  let precioHorasExtraInput = document.getElementById('precio_horas_extra');

  const precios = {
    '0': 0,
    '1': 200,
    '2': 400,
    '3': 600,
    '4': 800
  };

  precioHorasExtraInput.placeholder = seleccion ? "" : "Precio horas extra";
  precioHorasExtraInput.value = seleccion !== undefined ? precios[seleccion] || 0 : 0;
}

//CREACION DE ALERTA PERSONALIZADA (pendiente)

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

  if (precioHorasExtra === "") {
    Swal.fire({
      title: "Por favor, seleccione el número de horas extra",
      icon: "warning",
      customClass: {
        confirmButton: "boton-alerta-horas-extra"
      },
    });
    return; // Detener la ejecución de la función si no se han seleccionado horas extras
  }

  var total = parseInt(precioPaquete) + parseInt(precioHorasExtra);

  Swal.fire({
    title: "El total de su cotización es de $" + total + "\n (No se incluye costo de servicios adicionales)",
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

//Validacion del input numero para que contenga 10 digitos y permitir el envio del formulario

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
      title: '¿Desea enviar su cotizacion?',
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
  
  var boton = document.getElementById("toggleButton");
  boton.textContent = isHidden ? "Ocultar" : "Otros Servicios"; // Cambiar el texto del botón
  
  if (isHidden) {
    Toastify({
      text: "Se le enviará más información vía Whatsapp en caso de seleccionar otros servicios",
      duration: 5500,
      style: {
        background: "#6c757d"
      },
      className: "alert-otros-servicios"
    }).showToast();
  }
}



