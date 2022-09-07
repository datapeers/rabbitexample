import { Observable, ReplaySubject } from "rxjs";
import { Connection, ConsumeMessage } from "amqplib";
import { QueueMessage, QueueServerRepository } from "./queue-server-repository";
import ampq from "amqplib";
import { injectable } from "inversify";

@injectable()
export class RabbitMQProvider implements QueueServerRepository {
    private connection: Connection | null = null;

    public arrivedMessage: ReplaySubject<QueueMessage<string>>;

    constructor() {
        this.arrivedMessage = new ReplaySubject<QueueMessage<string>>();
    }

    connect() {
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
        console.log("Publicando", data);
        console.log(channel?.publish(exchangeName, keys, Buffer.from(JSON.stringify(data))));
        return Promise.resolve();
    }

    async listenExchange<T>(exchangeName: string, args: string[]) {
        const channel = await this.connection?.createChannel();
        channel?.assertExchange(exchangeName, "topic", { durable: false });

        const assertQueue = await channel?.assertQueue("", { exclusive: true });

        args.forEach((element) => {
            channel?.bindQueue(assertQueue?.queue ?? "", exchangeName, element);
        });

        channel?.consume(
            assertQueue?.queue ?? "",
            (msg: ConsumeMessage | null) => {
                console.log("Recibiendo en empresarios", msg?.content.toString());
                this.arrivedMessage.next({
                    msg: msg?.content.toString(),
                    exchangeName: msg?.fields.exchange,
                    keys: msg?.fields.routingKey ?? "",
                } as QueueMessage<T>);
            },
            {
                noAck: true,
            }
        );
    }
}
