import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";
import { strings } from "../../localisation/Strings";

export enum TriageCode {
    Immediate = 1,
    Emergency = 2,
    Urgent = 3,
    SemiUrgent = 4,
    NonUrgent = 5,
}

export namespace TriageCode {
    export function toString(code: TriageCode): string {
        switch (code) {
            case TriageCode.Immediate:
                return strings("triageCode.1");
            case TriageCode.Emergency:
                return strings("triageCode.2");
            case TriageCode.Urgent:
                return strings("triageCode.3");
            case TriageCode.SemiUrgent:
                return strings("triageCode.4");
            case TriageCode.NonUrgent:
                return strings("triageCode.5");
            default:
                throw new UnreachableCaseError(code);
        }
    }
}
