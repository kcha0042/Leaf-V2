import UUID from "../../model/core/UUID";
import NavigationEnvironment from "./navigators/NavigationEnvironment";

class LeafStackRoot {

    public readonly id: UUID = UUID.generate();
    private isFocused: boolean = false;
    private readonly _activateStack: () => void;
    public readonly activateStack = () => {
        NavigationEnvironment.inst.setFocusedStackRoot(this.id);
        this._activateStack();
    }

    constructor(
        public readonly title: string,
        activateStack: () => void,
        public readonly focusedIcon: string,
        public readonly icon: string,
    ) {
        this._activateStack = activateStack;
    }

}

export default LeafStackRoot;