import FormEntry from "./FormEntry";

class Session {

    public static readonly instance = new Session()

    /**
     * THIS IS A DEMO PROPERTY
     */
    public formEntry?: FormEntry = null

    private constructor() { }

}

export default Session;