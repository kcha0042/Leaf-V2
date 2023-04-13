
/**
 * THIS IS A DEMO CLASS
 */

class FormEntry {

    private text1: string
    private text2: string

    constructor(text1, text2) {
        this.text1 = text1
        this.text2 = text2
    }

    public getContent(): string {
        return `Text 1: ${this.text1}\nText 2: ${this.text2}`
    }

}

export default FormEntry;