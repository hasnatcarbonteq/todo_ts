export interface IAuthRepository {
    add(authEntity: {}): Promise<boolean>;
    findByEmail(email: string): Promise<any>;
}