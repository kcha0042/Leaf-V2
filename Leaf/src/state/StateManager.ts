import LeafPublisher from "./LeafPublisher";
import LeafValuePublisher from "./LeafValuePublisher"
import { LoginStatus } from "./LoginStatus";

class StateManager {

    /**
     * THIS IS A DEMO PROPERTY
     */
    public static readonly formSubmitted = new LeafPublisher();

    public static readonly loginStatus = new LeafValuePublisher(LoginStatus.loggedOut);

}

export default StateManager;