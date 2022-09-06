import { injectable } from "inversify";
import { AuthenticationRepository } from "../repository/authentication-repository";

@injectable()
export class FirebaseFakeProvider implements AuthenticationRepository {
    isValidToken(token: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}
