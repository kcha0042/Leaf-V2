import { View } from "react-native";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";

interface LabeledTextProps {
    label: string;
    text: string;
    children?: any;
}

const LabeledText: React.FC<LabeledTextProps> = ({ label, text, children }) => {
    return (
        <View>
            <LeafText typography={LeafTypography.subscript}>{label}</LeafText>

            <LeafText typography={LeafTypography.body}>{text}</LeafText>

            {children}
        </View>
    );
};

export default LabeledText;
