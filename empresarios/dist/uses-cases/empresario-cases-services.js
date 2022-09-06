"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresarioCasesServices = void 0;
const tslib_1 = require("tslib");
class EmpresarioCasesServices {
    constructor(dataServices) {
        this.dataServices = dataServices;
    }
    createEmpresario(empresario) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const createdEmpresario = yield this.dataServices.create(empresario);
                return createdEmpresario;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getEmpresarios() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const empresarios = yield this.dataServices.getAll();
                return empresarios;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getEmpresario(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const empresario = yield this.dataServices.get(id);
                return empresario;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteEmpresario(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const empresarioDeleted = yield this.dataServices.delete(id);
                return empresarioDeleted;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.EmpresarioCasesServices = EmpresarioCasesServices;
//# sourceMappingURL=empresario-cases-services.js.map