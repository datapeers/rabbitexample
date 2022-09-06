"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class EmpresarioController {
    constructor(empresarioCases) {
        this.empresarioCases = empresarioCases;
    }
    getAllUsers(_req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.empresarioCases.getEmpresarios();
            return res.json(result);
        });
    }
}
exports.default = EmpresarioController;
//# sourceMappingURL=empresario-controller.js.map