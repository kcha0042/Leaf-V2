import LeafPublisher from "../../../state/publishers/impl/LeafPublisher";

class NavigationStateManager {
    public static readonly sidebarComponentChanged = new LeafPublisher();

    public static readonly newScreenAdded = new LeafPublisher();

    public static readonly headerShouldUpdate = new LeafPublisher();
}

export default NavigationStateManager;
