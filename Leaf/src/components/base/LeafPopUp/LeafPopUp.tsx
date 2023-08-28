import React from "react";
import { Dialog, Portal } from "react-native-paper";
import LeafText from "../LeafText/LeafText";
import LeafTypographyConfig from "../../styling/typography/LeafTypographyConfig";
import LeafColor from "../../styling/color/LeafColor";
import LeafTextButton from "../LeafTextButton/LeafTextButton";
import LeafTypography from "../../styling/LeafTypography";
import { LeafFontWeight } from "../../styling/typography/LeafFontWeight";
import LeafColors from "../../styling/LeafColors";
import Environment from "../../../state/environment/Environment";
import { OS } from "../../../state/environment/types/OS";
import { ScreenType } from "../../../state/environment/types/ScreenType";
import HStack from "../../containers/HStack";
import Spacer from "../../containers/layout/Spacer";

interface Props {
    visible: boolean;
    onCancel: () => void;
    onDone: () => void;
    backgroundColour?: LeafColor;
    title: string;
    titleTypography?: LeafTypographyConfig;
    children: any;
}

export const LeafPopUp: React.FC<Props> = ({
    visible,
    onCancel,
    onDone,
    backgroundColour = LeafColors.fillBackgroundLightPopUp,
    title,
    titleTypography = LeafTypography.title2,
    children,
}) => {
    const cancelFont = LeafTypography.textButton;
    cancelFont.weight = LeafFontWeight.Regular;
    cancelFont.leafColor = LeafColors.mediumAccent;

    return (
        <Portal>
            <Dialog
                visible={visible}
                style={{
                    backgroundColor: backgroundColour.getColor(),
                    shadowColor: LeafColors.shadow.getColor(),
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    // Shadows appear sligntly differnt on web
                    shadowOpacity: Environment.inst.getOS() == OS.Web ? 0.16 : 0.12,
                    shadowRadius: Environment.inst.getOS() == OS.Web ? 12 : 7,
                    width: Environment.inst.getScreenType() == ScreenType.Large ? "50%" : "90%",
                    alignSelf: "center"
                }}
            >
                <Dialog.Title>
                    <LeafText typography={titleTypography}> {title} </LeafText>
                </Dialog.Title>

                <Dialog.Content>{children}</Dialog.Content>

                <Dialog.Actions>
                    <HStack
                        style={{
                            flex: 1,
                        }}
                    >    
                        <Spacer/>
                        <LeafTextButton label={"Cancel"} typography={cancelFont} onPress={onCancel}/>
                        <Spacer/>
                        <LeafTextButton label={"Done"} typography={LeafTypography.textButton} onPress={onDone}/>
                        <Spacer/>
                    </HStack>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
