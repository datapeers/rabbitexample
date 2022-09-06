"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresarioProvider = void 0;
const tslib_1 = require("tslib");
const empresario_1 = require("../../entities/empresario");
const empresario_schema_1 = require("./empresario-schema");
const typedi_1 = require("typedi");
let EmpresarioProvider = class EmpresarioProvider {
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return empresario_schema_1.EmpresarioModel.find({}).lean();
        });
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return empresario_schema_1.EmpresarioModel.find({ _id: id }).lean();
        });
    }
    create(item) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return empresario_schema_1.EmpresarioModel.create(empresario_1.Empresario);
        });
    }
    update(id, item) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield empresario_schema_1.EmpresarioModel.replaceOne({ _id: id }, { item });
            return Promise.resolve(item);
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield empresario_schema_1.EmpresarioModel.deleteOne({ _id: id });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
EmpresarioProvider = tslib_1.__decorate([
    (0, typedi_1.Service)({ global: true })
], EmpresarioProvider);
exports.EmpresarioProvider = EmpresarioProvider;
//# sourceMappingURL=empresario-provider.js.map