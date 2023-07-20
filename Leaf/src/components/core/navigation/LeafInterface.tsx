import LeafStack from "./LeafStack";
import LeafStackRoot from "./LeafStackRoot";

class LeafInterface {

    private _roots: LeafStackRoot[] = []
    public get roots(): LeafStackRoot[] {
        return this._roots;
    }

    constructor() { }

    public addRoot(root: LeafStackRoot): LeafInterface {
        this.roots.push(root);
        return this;
    }

}

export default LeafInterface;