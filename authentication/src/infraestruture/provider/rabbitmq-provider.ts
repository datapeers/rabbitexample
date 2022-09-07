import { Observable, ReplaySubject } from "rxjs";
import { QueueMessage, QueueServerRepository } from "../repository/queue-server-repository";
import { Channel, Connection, ConsumeMessage, Replies } from "amqplib";
import { injectable } from "inversify";
import ampq from "amqplib";

@injectable()
export class RabbitMQProvider implements QueueServerRepository {
    private connection: Connection | null = null;
    public messageArrive: ReplaySubject<QueueMessage>;
    public connected: Promise<boolean>;

    constructor() {
        this.messageArrive = new ReplaySubject();
        this.connected = new Promise((res, rej) => {
            ampq.connect("amqp://admin:admin@rabbitmq:5672")
                .then((connection: Connection) => {
                    console.log("Conectado con rabbitmq");
                    this.connection = connection;
                    res(true);
                })
                .catch((error) => {
                    console.error("No se pudo connectar con rabbitmq", error);
                    res(false);
                });
        });
    }

    async sendToExchange<T>(exchangeName: string, keys: string, data: T): Promise<void> {
        const channel = await this.connection?.createChannel();
        channel?.assertExchange(exchangeName, "topic", { durable: false });
        channel?.publish(exchangeName, keys, Buffer.from(JSON.stringify(data)));
        return Promise.resolve();
    }

    listenExchange<T>(exchangeName: string, args: string[]): void {
        console.log("Construir el escucha");

        this.connection?.createChannel().then((channel: Channel) => {
            channel.assertExchange(exchangeName, "topic", { durable: false });
            channel.assertQueue("", { exclusive: true }).then((assertQueue: Replies.AssertQueue) => {
                args.forEach((element) => {
                    console.log("Colas: ", assertQueue?.queue);
                    channel?.bindQueue(assertQueue?.queue ?? "", exchangeName, element);
                });
                channel?.consume(
                    assertQueue?.queue ?? "",
                    (msg: ConsumeMessage | null) => {
                        console.log("Hemos recibido", msg?.content.toString());
                        this.messageArrive.next({
                            msg: msg?.content.toJSON(),
                            exchangeName: exchangeName,
                            keys: msg?.fields.routingKey ?? "",
                        } as QueueMessage);
                    },
                    {
                        noAck: true,
                    }
                );
            });
        });
    }
}
