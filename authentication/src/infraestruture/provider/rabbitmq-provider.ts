import { Observable, ReplaySubject } from "rxjs";
import { QueueMessage, QueueServerRepository } from "../repository/queue-server-repository";
import { Connection, ConsumeMessage } from "amqplib";
import { injectable } from "inversify";
import ampq from "amqplib";

@injectable()
export class RabbitMQProvider implements QueueServerRepository {
    private connection: Connection | null = null;

    constructor() {
        setTimeout(() => {
            ampq.connect("amqp://admin:admin@rabbitmq:5672")
                .then((connection: Connection) => {
                    console.log("Conectado con rabbitmq");
                    this.connection = connection;
                })
                .catch((error) => {
                    console.error("No se pudo connectar con rabbitmq", error);
                });
        }, 10000);
    }

    async sendToExchange<T>(exchangeName: string, keys: string, data: T): Promise<void> {
        const channel = await this.connection?.createChannel();
        channel?.assertExchange(exchangeName, "topic", { durable: false });
        channel?.publish(exchangeName, keys, Buffer.from(JSON.stringify(data)));
        return Promise.resolve();
    }

    async listenExchange<T>(exchangeName: string, args: string[]): Promise<Observable<QueueMessage>> {
        const channel = await this.connection?.createChannel();
        channel?.assertExchange(exchangeName, "topic", { durable: false });

        const assertQueue = await channel?.assertQueue("", { exclusive: true });
        let ans = new ReplaySubject<QueueMessage>();

        args.forEach((element) => {
            channel?.bindQueue(assertQueue?.queue ?? "", exchangeName, element);
        });

        channel?.consume(
            assertQueue?.queue ?? "",
            (msg: ConsumeMessage | null) => {
                console.log("Hemos recivido", msg?.content.toString());
                ans.next({
                    msg: msg?.content.toJSON(),
                    exchangeName: exchangeName,
                    keys: msg?.fields.routingKey ?? "",
                } as QueueMessage);
            },
            {
                noAck: true,
            }
        );

        return ans;
    }
}
