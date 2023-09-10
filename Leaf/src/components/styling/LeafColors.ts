import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";
import { TriageCode } from "../../model/triage/TriageCode";
import LeafColor from "./color/LeafColor";

/**
 * Predefined colors to be used application-wide.
 * Colors are defined with a light-mode and an optional dark-mode variant.
 * Colors should be named using light-mode convention, that is, colors should be named according to how they should be read in light mode. "Dark text" is text that is dark in light mode, and light in dark mode.
 * To select colors, I recommend the resource: https://yeun.github.io/open-color/
 */
class LeafColors {
    // General

    static get transparent(): LeafColor {
        return new LeafColor("transparent");
    }

    static get shadow(): LeafColor {
        return new LeafColor("black");
    }

    // Palette

    static get accent(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#4f37cc");
    }

    static get mediumAccent(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#7e61ed");
    }

    static get lightAccent(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#ded6ff");
    }

    // Text

    static get textBlack(): LeafColor {
        // TODO: Update for dark mode
        // Note: not literally black
        return new LeafColor("#212529");
    }

    static get textDark(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#3f4169");
    }

    static get textSemiDark(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#a6a8c5");
    }

    static get textWhite(): LeafColor {
        return new LeafColor("white");
    }

    static get textLight(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#f8f9fa");
    }

    static get textSemiLight(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#b6b8bb");
    }

    static get textError(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#e03131");
    }

    static get textSuccess(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#099268");
    }

    // Applies to text that overlays textBackgroundAccent and indicates what
    // should go in that text entry
    static get textUnderlyingAccent(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#c6bcd6");
    }

    // Applies to text that is used to label a text input but doesn't overlay
    // the text input itself
    static get textInputDescription(): LeafColor {
        // // TODO: Update for dark mode
        return new LeafColor("#99989a");
    }

    // Backgrounds

    static get textBackgroundDark(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#f4f5f7");
    }

    static get textBackgroundLight(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#ffffff");
    }

    static get textBackgroundAccent(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#f1edfc");
    }

    static get screenBackgroundLight(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#ffffff");
    }

    static get screenBackgroundSemiLight(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#fafafa");
    }

    static get fillBackgroundLight(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#f2f3f9");
    }

    static get fillBackgroundAccent(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#f1edfc");
    }

    static get fillBackgroundGreen(): LeafColor {
        return new LeafColor("#97fc6f");
    }

    static get fillBackgroundRed(): LeafColor {
        return new LeafColor("#e03131");
    }
    /**
     * The dialog from react-native-paper changes the colour slightly, so I made this to more closly match the {@link fillBackgroundLight}
     */
    static get fillBackgroundLightPopUp(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#e2e2e8");
    }

    // Outlines

    static get outlineTextBackgroundDark(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#e9e3e5");
    }

    static get outlineTextBackgroundAccent(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#ded8e8");
    }

    // Borders

    // Used for dividing sections, such as the drawer and sidebar
    static get divider(): LeafColor {
        return new LeafColor("gray");
    }

    // Triage

    public static triageCode(code: TriageCode): LeafColor {
        if (code.matches(TriageCode.immediate)) {
            return new LeafColor("#e03131");
        }
        if (code.matches(TriageCode.emergency)) {
            return new LeafColor("#fd7e14");
        }
        if (code.matches(TriageCode.urgent)) {
            return new LeafColor("#fab005");
        }
        if (code.matches(TriageCode.semiUrgent)) {
            return new LeafColor("#74b816");
        }
        if (code.matches(TriageCode.nonUrgent)) {
            return new LeafColor("#2f9e44");
        }
        throw new UnreachableCaseError(code);
    }

    public static textTriageCode(code: TriageCode): LeafColor {
        // At the moment all codes have light text overlays
        return LeafColors.textLight;
    }

    // Session Allocated

    public static sessionAllocated(session: string): LeafColor {
        switch (session) {
            case "Morning":
                return new LeafColor("#74b816");
            case "Afternoon":
                return new LeafColor("#fd7e14");
            case "Night":
                return new LeafColor("#1765e3");
            default:
                return new LeafColor("#e03131");
        }
    }
}

export default LeafColors;
