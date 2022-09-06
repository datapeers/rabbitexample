import { Observable, ReplaySubject } from "rxjs";
import { Connection, ConsumeMessage } from "amqplib";
import { QueueMessage, QueueServerRepository } from "./queue-server-repository";
import ampq from "amqplib";
import { injectable } from "inversify";

@injectable()
export class RabbitMQProvider implements QueueServerRepository {
    private connection: Connection | null = null;

    constructor() {
        ampq.connect("amqp://admin:admin@rabbitmq")
            .then((connection: Connection) => {
                console.log("Conectado con rabbitmq");
                this.connection = connection;
            })
            .catch((error) => {
                console.error("No se pudo connectar con rabbitmq", error);
            });
    }

    async sendToExchange<T>(exchangeName: string, keys: string, data: T): Promise<void> {
        const channel = await this.connection?.createChannel();
        channel?.assertExchange(exchangeName, "topic", { durable: false });
        channel?.publish(exchangeName, keys, Buffer.from(JSON.stringify(data)));
        return Promise.resolve();
    }

    async listenExchange<T>(exchangeName: string, args: string[]): Promise<Observable<QueueMessage<T>>> {
        const channel = await this.connection?.createChannel();
        channel?.assertExchange(exchangeName, "topic", { durable: false });

        const assertQueue = await channel?.assertQueue("", { exclusive: true });
        var ans = new ReplaySubject<QueueMessage<T>>();

        args.forEach((element) => {
            channel?.bindQueue(assertQueue?.queue ?? "", exchangeName, element);
        });

        channel?.consume(
            assertQueue?.queue ?? "",
            (msg: ConsumeMessage | null) => {
                ans.next({
                    msg: msg?.content.toJSON(),
                    exchangeName: exchangeName,
                    keys: msg?.fields.routingKey ?? "",
                } as QueueMessage<T>);
            },
            {
                noAck: true,
            }
        );

        return ans;
    }
}
