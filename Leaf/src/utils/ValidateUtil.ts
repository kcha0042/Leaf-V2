class ValidateUtil {
    public static valueIsDefined(input: unknown | undefined | null): boolean {
        return input != undefined && input != null;
    }

    public static stringIsValid(input: string | undefined | null): boolean {
        if (typeof input !== "string" || !input) return false;
        return input.trim() !== "";
    }

    public static mrnIsValid(mrn: string | undefined | null): boolean {
        if (typeof mrn !== "string") return false;
        if (mrn.trim() === "") return false;
        const invalidChars = /[<>{}\[\]\/\\|&^%$#@!~*()]/;
        if (invalidChars.test(mrn)) return false;
        return true;
    }

    public static postcodeIsValid(postcode: string | undefined | null): boolean {
        if (typeof postcode !== "string" || !postcode) return false;
        return /^\d{4}$/.test(postcode);
    }

    public static phoneNumberIsValid(phone: string | undefined | null): boolean {
        if (typeof phone !== "string" || !phone) return false;
        // This regex allows for a sequence of digits and possibly allows
        // for common punctuation such as hyphens, spaces, and parentheses.
        return /^[+\s()0-9-]{6,}$/.test(phone);
    }

    public static dobIsValid(dob: Date | undefined | null): boolean {
        if (!dob) return false; // Check for null or undefined
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return dob <= currentDate;
    }
}

export default ValidateUtil;
