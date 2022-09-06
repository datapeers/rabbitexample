import { Observable } from "rxjs";

export interface QueueServerRepository {
    sendToExchange<T>(exchangeName: string, keys: string, data: T): Promise<void>;

    listenExchange<T>(queueName: string, keys: string[]): Promise<Observable<QueueMessage<T>>>;
}

export type QueueMessage<T> = {
    msg: any;
    exchangeName: string;
    keys: string;
};
