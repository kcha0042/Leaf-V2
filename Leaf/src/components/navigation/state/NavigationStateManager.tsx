import LeafPublisher from "../../../state/publishers/impl/LeafPublisher";

class NavigationStateManager {
    public static readonly sidebarComponentChanged = new LeafPublisher();

    public static readonly screenStackUpdated = new LeafPublisher();
}

export default NavigationStateManager;
