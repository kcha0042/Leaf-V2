import LeafStack from "./LeafStack";

/**
 * The UI element for an account
 */
class LeafInterface {

    constructor(
        public readonly name: string,
        public readonly stacks: LeafStack[]
    ) { }

}

export default LeafInterface;