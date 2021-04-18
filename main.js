const tarjeta = document.querySelector('#tarjeta'),
    btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
    formulario = document.querySelector('#formulario-tarjeta'),
    numeroTarjeta = document.querySelector('#tarjeta .numero'),
    nombreTarjeta = document.querySelector('#tarjeta .nombre'),
    mesExpiracion = document.querySelector('#tarjeta .mes'),
    yearExpiracion = document.querySelector('#tarjeta .year'),
    ccv = document.querySelector('#tarjeta .ccv'),
    firma = document.querySelector('#tarjeta .firma p'),
    valorInputPorDefect = '#### #### #### ####',
    logoMarca = document.querySelector('#logo-marca');


// Volteamos la tarjeta para que vea el frente.

const mostrarFrente = () => {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active')
    }
}

// Rotación de la tarjeta

tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
})

// Botón de abrir formulario

btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active')
    formulario.classList.toggle('active');
})

// Select del mes generado dinamicamente
for (let i = 1; i <= 12; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

// Select del año generado dinamicamente

const yearActual = new Date().getFullYear();

for (let i = yearActual; i <= yearActual + 7; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

// Input numero de la tarjeta

formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;
    formulario.inputNumero.value = valorInput
        // Eliminamos espacios en blanco
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '')
        // Ponemos espacio cada cuatro numeros
        .replace(/([0-9]{4})/g, '$1 ')
        // Elimina el ultimo espaciado
        .trim();

    // Pintamos el valor del input en la tarjeta

    numeroTarjeta.textContent = valorInput;

    if (valorInput === '') {
        numeroTarjeta.textContent = valorInputPorDefect;

        logoMarca.innerHTML = "";
    }

    if (valorInput[0] == 4) {
        logoMarca.innerHTML = "";
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);
    } else if (valorInput[0] == 5) {
        logoMarca.innerHTML = "";
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen)
    }

    // Volteamos la tarjeta para que vea el frente.
    mostrarFrente();
});

// Input nombre de la tarjeta

formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');

    nombreTarjeta.textContent = valorInput;

    firma.textContent = valorInput

    mostrarFrente();

    if (valorInput == '') {
        nombreTarjeta.textContent = 'Néstor lima';
    }
});

// Select mes

formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;

    mostrarFrente();
})

// Select Year

formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);

    mostrarFrente();
})

// Mostrar el ccv

formulario.inputCCV.addEventListener('keyup', (e) => {
    let valorCcv = e.target.value
    ccv.textContent = valorCcv;

    // Mostrar parte trasera

    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active')
    }

    formulario.inputCCV.value = formulario.inputCCV.value
        // Eliminamos espacios en blanco
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '');
})