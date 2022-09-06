"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Server_1 = tslib_1.__importDefault(require("./Server"));
const mongo_database_1 = require("./data-access/mongo-database");
const port = 3000;
(0, mongo_database_1.database)("mongodb://localhost:27017/admin")
    .then(() => {
    Server_1.default.listen(port, () => {
        return console.log(`server is listening on ${port}`);
    });
})
    .catch((err) => {
    console.log("Problemas con: ", err);
});
//# sourceMappingURL=index.js.map