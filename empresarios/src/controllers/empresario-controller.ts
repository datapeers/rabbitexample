import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../core/abstracts";
import EmpresarioCasesServices from "../uses-cases/empresario-cases-services";

@injectable()
class EmpresarioController {
    constructor(
        @inject(TYPES.GenericCases)
        private readonly empresarioCases: EmpresarioCasesServices
    ) {}

    async getAllUsers(_req: Request, res: Response) {
        const result = await this.empresarioCases.getAll();
        return res.json(result);
    }
}

export default EmpresarioController;
