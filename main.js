let btnAgregar = document.getElementById("btnAgregar")
let divMensajes = document.getElementById("mensajes")
let btnEliminar = document.getElementById("btnEliminar")
let btnListar = document.getElementById("btnListar")
let btnBuscar = document.getElementById("btnBuscar")

const showMessage = (title, description) => {
    divMensajes.innerHTML = `
        <div class="container">
            <h4><b>${title}</b></h4>
            <p>${description}</p>
        </div>
    `
}

const clearMessage = () => {
    divMensajes.innerHTML = ""
}

btnAgregar.addEventListener("click", () => {
    clearMessage()
    let placaV = document.getElementById("placa").value.trim()
    let marcaV = document.getElementById("marca").value.trim()
    let modeloV = document.getElementById("modelo").value.trim()

    if (!placaV || !marcaV || !modeloV) {
        showMessage("Datos incompletos", "Debes completar placa, marca y modelo antes de agregar.")
        return null
    }

    let nuevoCarro = {placa: placaV, marca: marcaV, modelo: modeloV}
    fetch(`http://localhost:3000/vehiculo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCarro)
    })  
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(result => {
        if (result.ok) {
            showMessage("Auto agregado", `Se agregó un auto con placa ${placaV}.`)
            document.getElementById("placa").value = ""
            document.getElementById("marca").value = ""
            document.getElementById("modelo").value = ""
        } else {
            showMessage("No se pudo agregar", result.data.mensaje || "Ocurrió un error al agregar el auto.")
        }
    })
    .catch(() => {
        showMessage("Error", "No se pudo conectar con el servidor.")
    })
})

btnBuscar.addEventListener("click", () => {
    clearMessage()
    let placaV = document.getElementById("placa").value.trim()
    if (!placaV) {
        showMessage("Placa vacía", "Ingresa una placa para buscar.")
        return null;
    }

    fetch(`http://localhost:3000/vehiculo/${placaV}`)
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(result => {
        if (result.ok && !result.data.mensaje) {
            showMessage("Auto encontrado", `Placa: ${result.data.placa}, Marca: ${result.data.marca}, Modelo: ${result.data.modelo}`)
        } else {
            showMessage("Auto no encontrado", `No se encontró el auto con placa ${placaV}.`)
        }
    })
    .catch(() => {
        showMessage("Error", "No se pudo conectar con el servidor.")
    })
})

btnListar.addEventListener("click", () => {
    clearMessage()
    fetch(`http://localhost:3000/vehiculo`)
    .then(response => response.json())
    .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
            showMessage("Sin autos", "No hay autos registrados.")
            return null;
        }

        let texto = ""
        data.forEach(carro => {
            texto += `<br>
                <div class="container">
                    <h4><b>Auto con placa: ${carro.placa}</b></h4>
                    <p>Marca: ${carro.marca}, <br>Modelo: ${carro.modelo}</p>
                </div>`
        })
        divMensajes.innerHTML = texto
    })
    .catch(() => {
        showMessage("Error", "No se pudo conectar con el servidor.")
    })
})

btnEliminar.addEventListener("click", () => {
    clearMessage()
    let placaV = document.getElementById("placa").value.trim()
    if (!placaV) {
        showMessage("Placa vacía", "Ingresa una placa para eliminar.")
        return null
    }

    fetch(`http://localhost:3000/vehiculo/${placaV}`, {
        method: 'DELETE'
    })  
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(result => {
        if (result.ok) {
            showMessage("Auto eliminado", `Se eliminó un auto con placa ${placaV}.`)
        } else {
            showMessage("No se pudo eliminar", result.data.mensaje || `No se encontró la placa ${placaV}.`)
        }
    })
    .catch(() => {
        showMessage("Error", "No se pudo conectar con el servidor.")
    })
})
