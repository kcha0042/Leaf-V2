class ID {
    private readonly _code: string;

    constructor(code: string) {
        this._code = code;
    }

    public toString(): string {
        return this._code;
    }
}

export default ID;
