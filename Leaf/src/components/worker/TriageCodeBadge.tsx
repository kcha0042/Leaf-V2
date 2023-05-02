import { TextStyle, ViewStyle } from "react-native";
import Patient from "../../model/patient/Patient";
import LeafFlatContainer from "../core/containers/LeafFlatContainer/LeafRoundedContainer";
import LeafColors from "../core/styles/LeafColors";
import LeafTypography from "../core/styles/LeafTypography";
import LeafText from "../core/views/LeafText/LeafText";
import { HStack, Spacer, VStack, View } from "native-base";
import { TriageCode } from "../../model/triage/TriageCode";
import { useState } from "react";

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
                    padding: 3,
                    aspectRatio: 1, 
                }}
            >
                {code}
            </LeafText>
        </View>
    );
}

export default TriageCodeBadge;