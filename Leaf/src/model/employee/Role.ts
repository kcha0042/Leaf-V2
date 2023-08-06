import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";
import { strings } from "../../localisation/Strings";

export enum Role {
    Worker,
    Leader,
    Admin,
}

export namespace Role {
    export function toString(role: Role): string {
        switch (role) {
            case Role.Worker:
                return strings("role.worker");
            case Role.Leader:
                return strings("role.leader");
            case Role.Admin:
                return strings("role.admin");
            default:
                throw new UnreachableCaseError(role);
        }
    }
}