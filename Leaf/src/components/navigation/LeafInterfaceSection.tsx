import UUID from "../../model/core/UUID";
import NavigationSession from "./state/NavigationEnvironment";

class LeafInterfaceSection {
    public readonly id: UUID = UUID.generate();
    private readonly _activateOnTabBar: () => void;
    public readonly activateOnTabBar = () => {
        NavigationSession.inst.setFocusedInterfaceSection(this.id);
        this._activateOnTabBar();
    };
    private readonly _activateOnDrawer: () => void;
    public readonly activateOnDrawer = () => {
        NavigationSession.inst.setFocusedInterfaceSection(this.id);
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

export default LeafInterfaceSection;
