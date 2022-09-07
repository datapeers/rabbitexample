import { Observable } from "rxjs";

export interface QueueServerRepository {
    sendToExchange<T>(exchangeName: string, keys: string, data: T): Promise<void>;

    listenExchange<T>(exchangeName: string, keys: string[]): void;

    messageArrive: Observable<QueueMessage>;

    connected: Promise<boolean>;
}

export type QueueMessage = {
    msg: any;
    exchangeName: string;
    keys: string;
};

export let TYPES = {
    QueueServer: Symbol("QueueServer"),
    Authentication: Symbol("Authentication"),
    UseCases: Symbol("UseCases"),
};
