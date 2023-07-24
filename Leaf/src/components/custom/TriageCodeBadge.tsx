import { View, ViewStyle } from "react-native";
import { TriageCode } from "../../model/triage/TriageCode";
import Environment from "../../state/environment/Environment";
import { OS } from "../../state/environment/types/OS";
import LeafText from "../base/LeafText/LeafText";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    code: TriageCode;
    fillSpace: boolean;
    style?: ViewStyle;
}

const TriageCodeBadge: React.FC<Props> = ({ code, fillSpace, style }) => {
    const typography = LeafTypography.badge;
    typography.leafColor = LeafColors.textTriageCode(code);
    // Padding renders differntly on web
    const platformIsWeb = Environment.inst.getOS() == OS.Web;
    return (
        <View
            style={[
                {
                    borderRadius: 10,
                    width: platformIsWeb ? typography.size * 1.6 : null,
                    backgroundColor: LeafColors.triageCode(code).getColor(),
                    justifyContent: "center",
                    aspectRatio: 1,
                    alignSelf: fillSpace ? null : "center",
                },
                style,
            ]}
        >
            <LeafText
                typography={typography}
                wide={false}
                style={{
                    textAlign: "center",
                    padding: platformIsWeb ? 10 : 3,
                    aspectRatio: 1,
                }}
            >
                {code}
            </LeafText>
        </View>
    );
};

export default TriageCodeBadge;
