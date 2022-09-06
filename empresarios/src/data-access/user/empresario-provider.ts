import { Empresario } from "../../entities/empresario";
import { GenericRepository } from "../../core/abstracts";
import { EmpresarioModel } from "./empresario-schema";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../core/abstracts";

@injectable()
export class EmpresarioProvider implements GenericRepository<Empresario> {
    async getAll(): Promise<Empresario[]> {
        return EmpresarioModel.find({}).lean();
    }

    async get(id: string): Promise<Empresario> {
        return EmpresarioModel.find({ _id: id }).lean();
    }
    async create(item: Empresario): Promise<Empresario> {
        return EmpresarioModel.create(Empresario);
    }
    async update(id: string, item: Empresario): Promise<Empresario> {
        await EmpresarioModel.replaceOne({ _id: id }, { item });
        return Promise.resolve(item);
    }
    async delete(id: string): Promise<boolean> {
        try {
            await EmpresarioModel.deleteOne({ _id: id });
            return true;
        } catch (error) {
            throw error;
        }
    }
}
