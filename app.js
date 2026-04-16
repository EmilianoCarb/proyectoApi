import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

export class Vehiculo
{
    constructor(placa,marca,modelo)
    {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
    }
}

export class Almacen 
{
    constructor()
    {
        this.almacen = [];
    }

    agregar(auto)
    {
       let placa = this.buscar(auto.placa); 
        if(!placa) this.almacen.push(auto);
        else return null;
    }

    buscar(placa) {
        let auto =this.almacen.find(carro => carro.placa == placa); 
        if(!auto) return null;
        
        return auto;
    }
    
    eliminar(placa) {
        const indice = this.almacen.findIndex(carro => carro.placa == placa);
            if (indice == -1) {
                return null;
            }
            return this.almacen.splice(indice, 1)[0];
    }
}
let auto1 = new Vehiculo(12,"toyota", "algo");
let auto2 = new Vehiculo(13,"nissan", "ejemplo");
let almacen = new Almacen();
almacen.agregar(auto1)
almacen.agregar(auto2)
app.get('/vehiculo', (req, res) => {
    res.json(almacen.almacen)
})

app.get('/vehiculo/:placa', (req, res) => 
{
    let placa = req.params.placa;
    let carro = almacen.buscar(placa);
    if(carro != null)
    {
        res.json(carro);
    } else 
    {
        res.status(404).json({ mensaje: "Auto no encontrado" })
    }
})

app.delete('/vehiculo/:placa', (req, res) => {
    const placa = req.params.placa;
    const eliminado = almacen.eliminar(placa);
    
    if (eliminado) {
        res.json({ mensaje: "Eliminado con éxito", auto: eliminado.placa });
    } else {
        res.status(404).json({ mensaje: "No se pudo eliminar: placa no encontrado" });
    }
});
app.post('/vehiculo', (req, res) => {
    const carro = req.body
    if(almacen.buscar(carro.placa) == null) 
    {almacen.agregar(carro)
    res.status(201).json({
        mensaje: "Vehículo guardado exitosamente",
        data: req.body
    })
    } else 
    {
        res.status(404).json({mensaje:"Carro con esa placa ya existe"})
    }
})



app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});