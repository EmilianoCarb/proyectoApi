import { vehiculo } from "./app"
let btnAgregar = document.getElementById("btnAgregar")
let divCarros = document.getElementById("contenedorCarros") 
btnAgregar.addEventListener(click, () => 
{
    divCarros =''
    let texto = `<h4>Complete los campos con la informacion requerida</h4>

        <form id = "formulario-carro">
            <label>Placa:</label>
            <input type="text" id="placa" required>
            <br>
            <label>Marca:</label>
            <input type = "text" id="marca" required>   
            <br>
            <label>Modelo</label>
            <input type="text" id="modelo" required>
            <br>
            <button type="button" onclick=guardar()>Guardar Carro</button>
        </form>`;
    divCarros.innerHtml += texto;
})

function guardar()
{
    let placa = document.getElementById("placa")
    let marca = document.getElementById("marca")
    let modelo = document.getElementById("modelo")
    let carro = new vehiculo()
}


