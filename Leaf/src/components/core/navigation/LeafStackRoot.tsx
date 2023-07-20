import UUID from "../../../model/core/UUID";

class LeafStackRoot {

    public readonly id: UUID = UUID.generate();

    constructor(
        public readonly title: string,
        public readonly activateStack: () => void,
        public readonly icon: string,
        public readonly focusedIcon: string,
    ) { }

}

export default LeafStackRoot;