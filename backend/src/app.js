
// const apiRoutes = require('./routes')

import express from "express";

import cors from "cors";


const PORT = 3000;
const app = express();

const petDB = [{
    name: "sorpresa",
    color: "white",
    weight: 1500
},{
    name: "pequita",
    color: "black",
    weight: 1500  

},{
    name: "moncho",
    color: "black",
    weight: 1500  

}]

app.use(express.json());
app.use(cors());

app.get('/pets', (req,res) => {
    return res.json(petDB)
});

app.get('/pets:name', (req,res) => {
    const  petName = req.params.name;
    const foundPet = petDB.find(pet => pet.name === petName);
    res.json(foundPet);
});

app.post('/pets', (req,res) => {
    const pet = req.body;
    const  petName = pet.name;

    console.info('imput pet', pet);

    const alreadyThere = petDB.some(pet => pet.name === petName);
    if (alreadyThere){
        res.status(409);
        return;
    }
    petDB.push({
        name: pet.name,
        weight: pet.weight
    });
    res.status(201).json(pet);
});

app.listen(PORT, () => {
    console.info(`Proceso de servidor escuchando en el puerto ${PORT}`)
  });