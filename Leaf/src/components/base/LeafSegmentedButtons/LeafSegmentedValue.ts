class LeafSegmentedValue {
    public get id(): string {
        return this.label;
    }

    constructor(
        public readonly value: any,
        public readonly label: string,
    ) {}
}

export default LeafSegmentedValue;
