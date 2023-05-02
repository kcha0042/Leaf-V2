import { TextStyle, ViewStyle } from "react-native";
import Patient from "../../model/patient/Patient";
import LeafFlatContainer from "../core/containers/LeafFlatContainer/LeafFlatContainer";
import LeafColors from "../core/styles/LeafColors";
import LeafTypography from "../core/styles/LeafTypography";
import LeafText from "../core/views/LeafText/LeafText";
import { HStack, Spacer, VStack, View } from "native-base";
import { TriageCode } from "../../model/triage/TriageCode";
import { useState } from "react";
import Environment from "../../state/environment/Environment";
import { OS } from "../../state/environment/types/OS";

interface Props {
    code: TriageCode;
    fillSpace: boolean;
    style?: ViewStyle;
}

const TriageCodeBadge: React.FC<Props> = ({ 
    code,
    fillSpace,
    style,
}) => {
    let typography = LeafTypography.badge;
    typography.leafColor = LeafColors.textTriageCode(code);
    // Padding renders differntly on web
    let padding = Environment.instance.getOS() == OS.web ? 10 : 3;
    return (
        <View
            style={[
                {
                    borderRadius: 10,
                    backgroundColor: LeafColors.triageCode(code).getColor(),
                    justifyContent: 'center',
                    aspectRatio: 1,
                    alignSelf: fillSpace ? null : 'center',
                },
                style,
            ]}
        >
            <LeafText 
                typography={typography}
                wide={false}
                style={{
                    textAlign: 'center',
                    padding: padding,
                    aspectRatio: 1, 
                }}
            >
                {code}
            </LeafText>
        </View>
    );
}

export default TriageCodeBadge;