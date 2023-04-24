import { LeafPresetColor } from "../presets/LeafPresetColor";
import { LeafFontFamily } from "./LeafFontFamily";
import LeafFontFamilyConfig from "./LeafFontFamilyConfig";
import { StyleSheet } from 'react-native';

class LeafTypographyConfig {

    public size: number;
    public fontFamily: LeafFontFamily;
    public presetColor: LeafPresetColor;
    public bold: boolean;
    public italic: boolean;
    public underlined: boolean;
    public linedOut: boolean;
    get font(): string {
        let config: LeafFontFamilyConfig = LeafFontFamily.getConfig(this.fontFamily);
        return config.getFont(this.bold, this.italic);
    }
    get color(): string {
        return LeafPresetColor.getColor(this.presetColor);
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
        return (result as "none" | "underline" | "line-through" | "underline line-through");
    }

    constructor(
        size: number, 
        fontFamily: LeafFontFamily, 
        color: LeafPresetColor,
        bold: boolean = false, 
        italic: boolean = false, 
        underlined: boolean = false,
        linedOut: boolean = false
    ) {
        this.size = size;
        this.fontFamily = fontFamily;
        this.presetColor = color;
        this.bold = bold;
        this.italic = italic;
        this.underlined = underlined;
        this.linedOut = linedOut;
    }

    public getStylesheet(): {} {
        return StyleSheet.create({
            typography: {
                fontFamily: this.font,
                color: this.color,
                fontSize: this.size,
                textDecorationLine: this.lineStyle,
            }
        }).typography;
    }

}

export default LeafTypographyConfig;