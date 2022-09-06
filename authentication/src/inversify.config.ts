import { Container } from "inversify";
import { UseCases } from "./dominio/use-cases";
import { FirebaseFakeProvider } from "./infraestruture/provider/firebase-fake";
import { RabbitMQProvider } from "./infraestruture/provider/rabbitmq-provider";
import { AuthenticationRepository } from "./infraestruture/repository/authentication-repository";
import { QueueServerRepository, TYPES } from "./infraestruture/repository/queue-server-repository";

var container = new Container();

container.bind<QueueServerRepository>(TYPES.QueueServer).to(RabbitMQProvider);
container.bind<AuthenticationRepository>(TYPES.Authentication).to(FirebaseFakeProvider);
container.bind<UseCases>(TYPES.UseCases).to(UseCases);

export default container;
