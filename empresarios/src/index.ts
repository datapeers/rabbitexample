import app from "./Server";
import { database } from "./data-access/mongo-database";

const port = 3000;

console.log("Iniciando");
console.log(`Valor de variable ${process.env.VAR1}`);

database("mongodb://host.docker.internal:27017/testclean")
    .then(() => {
        app.listen(port, () => {
            return console.log(`server is listening on ${port}`);
        });
    })
    .catch((err) => {
        console.log("Problemas con: ", err);
    });
