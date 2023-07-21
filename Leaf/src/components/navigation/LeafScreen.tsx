/**
 * Our screen object
 */
class LeafScreen {
    // TODO: Make id auto-generate

    /**
     * @param title the name of the screen, this will displayed in the header
     * @param id the id of the screen for navigation
     * @param component the actual screen to render
     * @param options the options to add to the screen, these will be provided to the <Stack.Screen> component (https://reactnavigation.org/docs/stack-navigator)
     */
    constructor(
        public readonly title: string,
        public readonly id: string,
        public readonly component: React.FC,
        public readonly options?: object,
    ) {}
}

export default LeafScreen;
