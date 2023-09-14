import React from "react";
import { Dialog, Portal } from "react-native-paper";
import LeafText from "../LeafText/LeafText";
import LeafTypographyConfig from "../../styling/typography/LeafTypographyConfig";
import LeafColor from "../../styling/color/LeafColor";
import LeafTextButton from "../LeafTextButton/LeafTextButton";
import LeafTypography from "../../styling/LeafTypography";
import { LeafFontWeight } from "../../styling/typography/LeafFontWeight";
import LeafColors from "../../styling/LeafColors";
import { strings } from "../../../localisation/Strings";

interface Props {
    visible: boolean;
    onCancel: () => void;
    onDone: () => void;
    backgroundColour?: LeafColor;
    title: string;
    titleTypography?: LeafTypographyConfig;
    children: any;
    cancelLabel?: string;
    doneLabel?: string;
}

export const LeafPopUp: React.FC<Props> = ({
    visible,
    onCancel,
    onDone,
    backgroundColour = LeafColors.fillBackgroundLightPopUp,
    title,
    titleTypography = LeafTypography.title2,
    children,
    cancelLabel = undefined,
    doneLabel = undefined,
}) => {
    const cancelFont = LeafTypography.textButton;
    cancelFont.weight = LeafFontWeight.Regular;

    return (
        <Portal>
            <Dialog
                visible={visible}
                style={{
                    backgroundColor: backgroundColour.getColor(),
                }}
            >
                <Dialog.Title>
                    <LeafText typography={titleTypography}> {title} </LeafText>
                </Dialog.Title>

                <Dialog.Content>{children}</Dialog.Content>

                <Dialog.Actions>
                    <LeafTextButton
                        label={cancelLabel || strings("button.cancel")}
                        typography={cancelFont}
                        onPress={onCancel}
                    />

                    <LeafTextButton
                        label={doneLabel || strings("button.done")}
                        typography={LeafTypography.textButton}
                        onPress={onDone}
                    />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
