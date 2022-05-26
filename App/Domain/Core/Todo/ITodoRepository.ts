import PaginationData from "@infrastructure/Utils/PaginationData";
import Todo from "./Todo";
export interface ITodoRepository {
    add(todoEntity: {}): Promise<any>;
    findById(id: string): Promise<any>;
    findAll({}): Promise<PaginationData<any>>;
    update(todoEntity: {}): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}