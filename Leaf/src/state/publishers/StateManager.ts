import LeafColors from "../../components/styling/LeafColors";
import LeafPublisher from "./impl/LeafPublisher";
import LeafValuePublisher from "./impl/LeafValuePublisher";
import { LoginStatus } from "./types/LoginStatus";

/**
 * Stores application-level state to avoid having to pass state to different components, and reduces component coupling. Uses the publisher-subscriber pattern.
 *
 * To define value-less state, statically instantiate a LeafPublisher.
 * ``` public static readonly myState = new LeafPublisher(); ```
 * To publish to that state, call the publish method. This would be done in a component.
 * ``` StateManager.myState.publish(); ```
 * Any component can subscribe. Every time the state is published, a callback is called.
 * ```
 * StateManager.myState.subscribe(() => {
 *     // React to the state change, e.g. update hooks or call forceUpdate()
 * });
 * ```
 * ALl subscriptions should occur in useEffect hooks, since we only want the the component to subscribe on mount.
 *
 * To define a state with value, statically instantiate a LeafValuePublisher.
 * ``` public static readonly loginStatus = new LeafValuePublisher(LoginStatus.loggedOut); ```
 * To publish to that state, a value must be passed to the publish method. This would be done in a component.
 * ``` StateManager.loginStatus.publish(LoginStatus.worker); ```
 * Any component can subscribe. Every time the state is published, a callback is called.
 * ```
 * StateManager.loginStatus.subscribe(() => {
 *     // We can read the state value
 *     let stateValue: LoginStatus = StateManager.loginStatus.read();
 *
 *     // React to the state change, e.g. update hooks or call forceUpdate()
 * });
 * ```
 */
class StateManager {
    public static readonly loginStatus = new LeafValuePublisher(LoginStatus.LoggedOut);

    public static readonly workersFetched = new LeafPublisher();

    public static readonly patientsFetched = new LeafPublisher();

    public static readonly activePatientChanged = new LeafPublisher();
}

export default StateManager;
