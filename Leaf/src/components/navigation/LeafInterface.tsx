import LeafInterfaceSection from "./LeafInterfaceSection";

class LeafInterface {
    private _sections: LeafInterfaceSection[] = [];
    public get sections(): LeafInterfaceSection[] {
        return this._sections;
    }

    constructor() {}

    public addSection(section: LeafInterfaceSection): LeafInterface {
        this.sections.push(section);
        return this;
    }
}

export default LeafInterface;
