import { Empresario } from "@entities/empresario";
import { inject, injectable } from "inversify";
import { QueueServerRepository } from "src/infraestructure/queue-server-repository";
import { GenericRepository, TYPES } from "../core/abstracts";

@injectable()
class EmpresarioCasesServices {
    constructor(
        @inject(TYPES.GenericRepository) private readonly dataServices: GenericRepository<Empresario>,
        @inject(TYPES.QueueServer) private readonly queueService: QueueServerRepository
    ) {}

    update(id: string, item: Empresario): Promise<Empresario> {
        throw new Error("Method not implemented.");
    }

    async create(empresario: Empresario): Promise<Empresario> {
        try {
            console.log("asdasd");
            const createdEmpresario = await this.dataServices.create(empresario);
            return createdEmpresario;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            this.queueService.sendToExchange("authentication", "asteri.empresarios", "asdasdasdasds");
            const response = await this.dataServices.getAll();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async get(id: string): Promise<Empresario> {
        try {
            const empresario = await this.dataServices.get(id);
            return empresario;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const empresarioDeleted = await this.dataServices.delete(id);
            return empresarioDeleted;
        } catch (error) {
            throw error;
        }
    }
}

export default EmpresarioCasesServices;
