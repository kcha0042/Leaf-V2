import { View, ViewStyle } from "react-native";
import LeafText from "../base/LeafText/LeafText";
import HStack from "../containers/HStack";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    title: string;
    style?: ViewStyle;
}

const FormHeader: React.FC<Props> = ({ title, style }) => {
    return (
        <HStack style={{ ...style }}>
            <View
                style={{
                    height: 2.2,
                    flex: 1,
                    backgroundColor: LeafColors.accent.getColor(),
                    borderRadius: 12,
                    alignSelf: "center",
                }}
            />

            <LeafText
                typography={LeafTypography.title4.withColor(LeafColors.accent)}
                wide={false}
                style={{
                    paddingHorizontal: 12,
                }}
            >
                {title}
            </LeafText>

            <View
                style={{
                    height: 2.2,
                    flex: 1,
                    backgroundColor: LeafColors.accent.getColor(),
                    borderRadius: 12,
                    alignSelf: "center",
                }}
            />
        </HStack>
    );
};

export default FormHeader;
