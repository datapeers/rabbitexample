import { Empresario } from "@entities/empresario";
import { EmpresarioProvider } from "../data-access/user/empresario-provider";
import { Service } from "typedi";
import { IGenericRepository } from "./abstracts";

@Service()
export abstract class IDataServices {
    abstract empresarios: IGenericRepository<Empresario>;
}
