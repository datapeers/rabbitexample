import express from "express";
import EmpresarioController from "./controllers/empresario-controller";
import "reflect-metadata";
import container from "./inversify.config";
import { TYPES } from "./core/abstracts";

const app = express();

const empresarioController = container.get<EmpresarioController>(TYPES.EmpresarioController);

app.get("/empresarios", (req, res) => empresarioController.getAllUsers(req, res));

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Respuesta desde endpoint");
});

export default app;
