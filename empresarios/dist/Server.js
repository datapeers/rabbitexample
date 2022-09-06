"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const empresario_controller_1 = tslib_1.__importDefault(require("./controllers/empresario-controller"));
require("reflect-metadata");
const empresario_cases_services_1 = require("./uses-cases/empresario-cases-services");
const empresario_provider_1 = require("./data-access/user/empresario-provider");
const app = (0, express_1.default)();
const empresarioController = new empresario_controller_1.default(new empresario_cases_services_1.EmpresarioCasesServices(new empresario_provider_1.EmpresarioProvider()));
app.get("/empresarios", empresarioController.getAllUsers);
app.get("/", (req, res) => {
    res.send("Respuesta desde endpoint");
});
exports.default = app;
//# sourceMappingURL=Server.js.map