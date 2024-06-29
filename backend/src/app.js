import "dotenv/config"
import express from "express";
import cors from "cors";
import mainRouter from "./routers/async.router.js"
import { UserRouter } from './routers/user.router.js';
import { UserModel } from "./lib/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(mainRouter());

app.use('/users', UserRouter().registerRoutes());

app.post("/login", async (req, res) => {
  const {email, password } = req.body;
  const user = await UserModel().getByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({message: "Credenciales invalidas"});
  }

  const payload = {id: user.id};
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  res.json({token});
});



app.listen(port, () => {
  console.info(`Listening on port ${port}`)
});