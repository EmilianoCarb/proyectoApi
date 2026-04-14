import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

class vehiculo
{
    constructor(placa,marca,modelo)
    {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
    }
}

class almacen 
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

       
    listar()
    {
        
    }
     
    buscar(placa) {
        let auto =this.almacen.find(carro => carro.placa == placa); 
        if(!auto) return null;
        return auto;
    }
    
    eliminar(placa) {
        const indice = this.clases.findIndex(carro => carro.placa == placa);
            if (indice == -1) {
                return null;
            }
            return this.clases.splice(indice, 1)[0];
    }
}