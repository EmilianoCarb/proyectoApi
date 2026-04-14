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
        if()
    }
}