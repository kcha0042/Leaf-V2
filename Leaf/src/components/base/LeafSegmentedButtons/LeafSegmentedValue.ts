class LeafSegmentedValue {
    constructor(
        public readonly value: unknown,
        public readonly label: string | null = null,
        public readonly icon: string | null = null,
    ) {}
}

export default LeafSegmentedValue;
