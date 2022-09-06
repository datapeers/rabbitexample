export interface AuthenticationRepository {
    isValidToken(token: string): Promise<boolean>;
}
