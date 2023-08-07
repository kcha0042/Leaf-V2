import { strings } from "../../localisation/Strings";

export class Role {
    public static worker = new Role("WORKER");
    public static leader = new Role("LEADER");
    public static admin = new Role("ADMIN");
    public static unknown = new Role("UNKNOWN");

    public readonly id: string;

    constructor(id: string) {
        this.id = id.toUpperCase();
    }

    public matches(other: Role) {
        return this.id == other.id;
    }

    public toString(): string {
        if (this.matches(Role.worker)) {
            return strings("role.admin");
        }
        if (this.matches(Role.leader)) {
            return strings("role.leader");
        }
        if (this.matches(Role.worker)) {
            return strings("role.worker");
        }
        return strings("unknown");
    }
}
