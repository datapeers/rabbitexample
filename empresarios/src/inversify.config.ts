import { GenericRepository, TYPES } from "./core/abstracts";
import { Container } from "inversify";
import { EmpresarioProvider } from "./data-access/user/empresario-provider";
import { Empresario } from "./entities/empresario";
import EmpresarioCasesServices from "./uses-cases/empresario-cases-services";
import EmpresarioController from "./controllers/empresario-controller";
import { QueueServerRepository } from "./infraestructure/queue-server-repository";
import { RabbitMQProvider } from "./infraestructure/rabbitmq-provider";

var container = new Container();

container.bind<GenericRepository<Empresario>>(TYPES.GenericRepository).to(EmpresarioProvider);
container.bind<EmpresarioCasesServices>(TYPES.GenericCases).to(EmpresarioCasesServices);
container.bind<EmpresarioController>(TYPES.EmpresarioController).to(EmpresarioController);
container.bind<QueueServerRepository>(TYPES.QueueServer).to(RabbitMQProvider);

export default container;
