"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresarioModel = void 0;
const mongoose_1 = require("mongoose");
const empresarioSchema = new mongoose_1.Schema({
    uid: { type: String },
    item: { type: {} },
    nombre: { type: String, required: true },
});
exports.EmpresarioModel = (0, mongoose_1.model)("empresarios", empresarioSchema);
//# sourceMappingURL=empresario-schema.js.map