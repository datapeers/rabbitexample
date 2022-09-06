"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const database = (connection) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return mongoose_1.default.connect(connection);
});
exports.database = database;
//# sourceMappingURL=mongo-database.js.map