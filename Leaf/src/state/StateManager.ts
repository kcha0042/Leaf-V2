import LeafPublisher from "./LeafPublisher";
import LeafValuePublisher from "./LeafValuePublisher"

class StateManager {

    /**
     * THIS IS A DEMO PROPERTY
     */
    public static readonly formSubmitted = new LeafPublisher();

    public static readonly isLoggedIn = new LeafValuePublisher(true);

}

export default StateManager;