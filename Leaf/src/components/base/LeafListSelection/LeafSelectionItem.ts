class LeafSelectionItem<T> {
    public get id(): string {
        return this.title + this.subtitle;
    }

    constructor(
        public readonly title: string,
        public readonly subtitle: string,
        public readonly value: T,
    ) {}
}

export default LeafSelectionItem;
