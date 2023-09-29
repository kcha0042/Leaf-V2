import { View, ViewStyle } from "react-native";
import { TriageCode } from "../../model/triage/TriageCode";
import Environment from "../../state/environment/Environment";
import { OS } from "../../state/environment/types/OS";
import LeafText from "../base/LeafText/LeafText";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import FlatContainer from "../containers/FlatContainer";
import { strings } from "../../localisation/Strings";

interface Props {
    code: TriageCode;
    style?: ViewStyle;
}

const TriageCodeLabel: React.FC<Props> = ({ code, style }) => {
    return (
        <FlatContainer
            color={LeafColors.triageCode(code)}
            style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                alignSelf: "flex-start",
                borderRadius: 8,
                ...style,
            }}
        >
            <LeafText
                typography={LeafTypography.title1.withSize(12).withColor(LeafColors.textTriageCode(code))}
                wide={false}
                style={{
                    alignSelf: "flex-start",
                }}
            >
                {strings("label.triageCode2Param", code.code.toString(), code.toString())}
            </LeafText>
        </FlatContainer>
    );
};

export default TriageCodeLabel;
