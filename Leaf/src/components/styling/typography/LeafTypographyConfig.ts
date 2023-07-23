import LeafColor from "../color/LeafColor";
import { LeafFontFamily } from "./LeafFontFamily";
import LeafFontFamilyConfig from "./LeafFontFamilyConfig";
import { StyleSheet, TextStyle } from "react-native";
import { LeafFontWeight } from "./LeafFontWeight";

class LeafTypographyConfig {
    public size: number;
    public fontFamily: LeafFontFamily;
    // An undefined color allows the component handle the color
    public leafColor: LeafColor | undefined;
    public weight: LeafFontWeight;
    public italic: boolean;
    public underlined: boolean;
    public linedOut: boolean;
    public kerning: number;
    get font(): string {
        const config: LeafFontFamilyConfig = LeafFontFamily.getConfig(this.fontFamily);
        return config.getFont(this.weight, this.italic);
    }
    get color(): string | undefined {
        return this.leafColor?.getColor();
    }
    get lineStyle(): "none" | "underline" | "line-through" | "underline line-through" {
        let result = "";
        if (!this.underlined && !this.linedOut) {
            result = "none";
        } else {
            if (this.underlined) {
                result = "underline";
            }
            if (this.linedOut) {
                result = (result + " line-through").trimStart();
            }
        }
        return result as "none" | "underline" | "line-through" | "underline line-through";
    }

    constructor(
        size: number,
        fontFamily: LeafFontFamily,
        color: LeafColor | undefined,
        weight: LeafFontWeight = LeafFontWeight.regular,
        italic: boolean = false,
        underlined: boolean = false,
        linedOut: boolean = false,
        kerning: number = 0,
    ) {
        this.size = size;
        this.fontFamily = fontFamily;
        this.leafColor = color;
        this.weight = weight;
        this.italic = italic;
        this.underlined = underlined;
        this.linedOut = linedOut;
        this.kerning = kerning;
    }

    public withSize(size: number): LeafTypographyConfig {
        this.size = size;
        return this;
    }

    public withColor(color: LeafColor): LeafTypographyConfig {
        this.leafColor = color;
        return this;
    }

    public withWeight(weight: LeafFontWeight): LeafTypographyConfig {
        this.weight = weight;
        return this;
    }

    public withItalic(italic: boolean): LeafTypographyConfig {
        this.italic = italic;
        return this;
    }

    public withUnderline(underline: boolean): LeafTypographyConfig {
        this.underlined = underline;
        return this;
    }

    public withLineOut(lineOut: boolean): LeafTypographyConfig {
        this.linedOut = lineOut;
        return this;
    }

    public getStylesheet(): TextStyle {
        return StyleSheet.create({
            typography: {
                color: this.color,
                fontFamily: this.font,
                fontSize: this.size,
                textDecorationLine: this.lineStyle,
                letterSpacing: this.kerning,
            },
        }).typography;
    }
}

export default LeafTypographyConfig;
