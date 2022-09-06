import { inject, injectable } from "inversify";
import { AuthenticationRepository } from "../infraestruture/repository/authentication-repository";
import { QueueMessage, QueueServerRepository, TYPES } from "../infraestruture/repository/queue-server-repository";
import "reflect-metadata";

@injectable()
export class UseCases {
    constructor(
        @inject(TYPES.Authentication) private readonly authentication: AuthenticationRepository,
        @inject(TYPES.QueueServer) private readonly queueServer: QueueServerRepository
    ) {
        this.listenQueue();
    }

    async listenQueue() {
        const listen = await this.queueServer.listenExchange<string>("authentication", ["asteri.empresarios"]);
        listen.subscribe((msg: QueueMessage) => {
            this.isTokenValid(msg.msg ?? "", msg.exchangeName, msg.keys);
        });
    }

    async isTokenValid(token: string, exchangeName: string, keys: string) {
        this.queueServer.sendToExchange<string>(exchangeName, keys, (await this.authentication.isValidToken(token)) ? "valid" : "invalid");
    }
}
