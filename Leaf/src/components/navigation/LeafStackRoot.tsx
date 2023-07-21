import UUID from "../../model/core/UUID";
import NavigationEnvironment from "./navigators/NavigationEnvironment";

class LeafStackRoot {
    public readonly id: UUID = UUID.generate();
    private readonly _activateOnTabBar: () => void;
    public readonly activateOnTabBar = () => {
        NavigationEnvironment.inst.setFocusedStackRoot(this.id);
        this._activateOnTabBar();
    };
    private readonly _activateOnDrawer: () => void;
    public readonly activateOnDrawer = () => {
        NavigationEnvironment.inst.setFocusedStackRoot(this.id);
        this._activateOnDrawer();
    };

    constructor(
        public readonly title: string,
        activateOnTabBar: () => void,
        activateOnDrawer: () => void,
        public readonly focusedIcon: string,
        public readonly icon: string,
    ) {
        this._activateOnTabBar = activateOnTabBar;
        this._activateOnDrawer = activateOnDrawer;
    }
}

export default LeafStackRoot;
