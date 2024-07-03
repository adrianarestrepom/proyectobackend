import "dotenv/config";
import express from "express";
import cors from "cors";
import mainRouter from "./routers/async.router.js";
import { UserRouter } from './routers/user.router.js';
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "./lib/user.model.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(mainRouter());
app.use('/users', UserRouter().registerRoutes());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel().getByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ token });
});

app.put('/groups/:id', async (req, res) => {
  try {
    const groupId = req.params.id;
    const updatedGroupData = req.body;

    // Ejemplo de validación básica
    if (!updatedGroupData.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Actualiza el grupo en la base de datos o en el almacenamiento correspondiente
    // Aquí deberías manejar la lógica para actualizar el grupo

    res.status(200).json(updatedGroupData); // Envía una respuesta exitosa

  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ error: 'Failed to update group' });
  }
});


app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});