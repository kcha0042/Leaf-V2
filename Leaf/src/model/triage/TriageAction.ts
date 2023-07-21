/**
 * Describes post-triage actions for workers to execute.
 */
class TriageAction {
    public readonly supervision: string;
    public readonly actions: string[];
    public readonly consider: string[];

    constructor(supervision: string, actions: string[], consider: string[]) {
        this.supervision = supervision;
        this.actions = actions;
        this.consider = consider;
    }
}

export default TriageAction;
