export interface GenericRepository<T> {
    getAll: () => Promise<T[]>;

    get(id: string): Promise<T>;

    create(item: T): Promise<T>;

    update(id: string, item: T): Promise<T>;

    delete(id: string): Promise<boolean>;
}

export let TYPES = {
    GenericRepository: Symbol("GenericRepository"),
    GenericCases: Symbol("GenericCases"),
    EmpresarioController: Symbol("EmpresarioController"),
    QueueServer: Symbol("QueueServer"),
};
