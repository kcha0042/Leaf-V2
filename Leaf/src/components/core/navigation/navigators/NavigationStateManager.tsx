import LeafPublisher from "../../../../state/publishers/impl/LeafPublisher";
import LeafValuePublisher from "../../../../state/publishers/impl/LeafValuePublisher";

class NavigationStateManager {

    public static readonly sidebarComponentChanged = new LeafPublisher();

    public static readonly newScreenAdded = new LeafPublisher();

    public static readonly headerShouldUpdate = new LeafPublisher();

}

export default NavigationStateManager;