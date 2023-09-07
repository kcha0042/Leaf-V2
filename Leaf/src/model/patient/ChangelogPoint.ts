import UUID from "../core/UUID";

class ChangelogPoint {
    public readonly id: UUID;

    public get dateDescription(): string {
        const timeText = this.date
            .toLocaleTimeString("en-AU", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            })
            .toUpperCase();
        const dateText = this.date.toDateString();
        return `${timeText}\n${dateText}`;
    }

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
