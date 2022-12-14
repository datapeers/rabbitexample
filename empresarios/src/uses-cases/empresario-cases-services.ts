import { Empresario } from "@entities/empresario";
import { inject, injectable } from "inversify";
import { firstValueFrom } from "rxjs";
import { QueueMessage, QueueServerRepository } from "src/infraestructure/queue-server-repository";
import { GenericRepository, TYPES } from "../core/abstracts";

@injectable()
class EmpresarioCasesServices {
    constructor(
        @inject(TYPES.GenericRepository) private readonly dataServices: GenericRepository<Empresario>,
        @inject(TYPES.QueueServer) private readonly queueService: QueueServerRepository
    ) {
        this.listen();
    }

    async listen() {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        this.queueService.connect();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.queueService.listenExchange("authentication", ["answer.asteri.empresarios"]);
    }

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
            const value = await firstValueFrom(this.queueService.arrivedMessage);
            console.log(value.msg);
            if (value.msg.toString() == "valid") {
                console.log(1);
                const response = await this.dataServices.getAll();
                return response;
            } else {
                console.log(2);
                return [];
            }
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
