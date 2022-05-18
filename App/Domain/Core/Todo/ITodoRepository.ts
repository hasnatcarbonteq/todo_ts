export interface ITodoRepository {
    add(todoEntity: {}): Promise<any>;
    findById(id: string): Promise<any>;
    findAll(): Promise<any[]>;
    update(todoEntity: {}): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}