class PasswordUtil {
    public static isCorrectPassword(password: string, storedPass: string): boolean {
        return password === storedPass;
    }
}

export default PasswordUtil;
