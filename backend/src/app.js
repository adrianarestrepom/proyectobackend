
// const apiRoutes = require('./routes')

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import routesGroups from "./routes/index.js"

const PORT = 3007;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/groups', routesGroups);

app.listen(PORT, () => {
    console.log(`Proceso de servidor escuchando en el puerto ${PORT}`)
  });