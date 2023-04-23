import { LeafPresetColor } from "../presets/LeafPresetColor";
import { LeafFontFamily } from "./LeafFontFamily";
import LeafFontFamilyConfig from "./LeafFontFamilyConfig";
import { StyleSheet } from 'react-native';

class LeafTypographyConfig {

    public size: number;
    public fontFamily: LeafFontFamily;
    public color: LeafPresetColor;
    public bold: boolean;
    public italic: boolean;
    public underlined: boolean;
    public linedOut: boolean;

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
        this.color = color;
        this.bold = bold;
        this.italic = italic;
        this.underlined = underlined;
        this.linedOut = linedOut;
    }

    public getStylesheet(): {} {
        let config: LeafFontFamilyConfig = LeafFontFamily.getConfig(this.fontFamily);
        let font = config.getFont(this.bold, this.italic);
        let lineStyle = "";
        if (!this.underlined && !this.linedOut) {
            lineStyle = "none";
        } else {
            if (this.underlined) {
                lineStyle = "underline";
            }
            if (this.linedOut) {
                lineStyle = (lineStyle + " line-through").trimStart();
            }
        }
        return StyleSheet.create({
            typography: {
                fontFamily: font,
                color: LeafPresetColor.getColor(this.color),
                fontSize: this.size,
                textDecorationLine: (lineStyle as "none" | "underline" | "line-through" | "underline line-through"),
            }
        }).typography;
    }

}

export default LeafTypographyConfig;