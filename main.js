import { Vehiculo, almacen, Almacen } from "./app"
let btnAgregar = document.getElementById("btnAgregar")
let divCarros = document.getElementById("contenedorCarros")
let btnEliminar = document.getElementById("btnEliminar")
let btnListar = document.getElementById("btnListar")
let btnBuscar = document.getElementById("btnBuscar")
btnAgregar.addEventListener("click", () => 
{
    let placaV = document.getElementById("placa").value
    let marcaV = document.getElementById("marca").value
    let modeloV = document.getElementById("modelo").value
    let nuevoCarro = {placa: placaV, marca: marcaV,modelo: modeloV}
    fetch(`http://localhost:3000/vehiculo`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoCarro)
    })  
    .then(response => response.json())
    .then(data =>
        
        console.log(data)
    ) })


btnBuscar.addEventListener("click", ()=> 
{   
    let placaV = document.getElementById("placa").value
    fetch(`http://localhost:3000/vehiculo/${placaV}`)
    .then(response => response.json())
    .then(data => 
    {
        let texto = `Placa: ${data.placa}, Marca: ${data.marca}, Modelo: ${data.modelo}`;
        divCarros.innerHTML = texto;
    })
})

btnListar.addEventListener("click", ()=> 
{   
    let placaV = document.getElementById("placa").value
    fetch(`http://localhost:3000/vehiculo/${placaV}`)
    .then(response => response.json())
    .then(data => 
    {

    })
})

btnEliminar.addEventListener("click", ()=>
{
    let placaV = document.getElementById("placa").value
    fetch(`http://localhost:3000/vehiculo/${placaV}`, 
{method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
    })  
    .then(response => response.json())
    .then(data =>
        
        console.log(data)
    ) })
