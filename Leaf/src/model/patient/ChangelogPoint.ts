import UUID from "../core/UUID";

class ChangelogPoint {
    public readonly id: UUID;

    constructor(
        public readonly date: Date,
        public readonly description: string,
        id: UUID,
    ) {
        this.id = id;
    }

    public static new(date: Date, description: string): ChangelogPoint {
        return new ChangelogPoint(date, description, UUID.generate());
    }
}

export default ChangelogPoint;
