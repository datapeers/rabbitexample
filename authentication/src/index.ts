import { UseCases } from "./dominio/use-cases";
import container from "./inversify.config";
import "reflect-metadata";
import { TYPES } from "./infraestruture/repository/queue-server-repository";
import express from "express";

const main = async () => {
    console.log("Iniciado!!");
    container.get<UseCases>(TYPES.UseCases);
    await new Promise((resolve) => setTimeout(resolve, 60000));
};

main();

const port = 3500;

const app = express();

app.listen(port, () => {
    console.log("Express iniciado");
});

console.log("Finalizado!!");
