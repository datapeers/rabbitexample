import { Schema, model, connect } from "mongoose";
import { Empresario } from "@entities/empresario";

const empresarioSchema = new Schema<Empresario>({
    uid: { type: String },
    item: { type: {} },
    nombre: { type: String, required: true },
});

export const EmpresarioModel = model<Empresario>("empresarios", empresarioSchema);
