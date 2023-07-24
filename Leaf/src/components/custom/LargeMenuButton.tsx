import { StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LeafText from "../base/LeafText/LeafText";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    label: string;
    size: number;
    icon?: string; // https://pictogrammers.com/library/mdi/
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
}

const LargeMenuButton: React.FC<Props> = ({ label, size, icon = null, style, onPress }) => {
    const typography = LeafTypography.title3;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                {
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: size / 4,
                    backgroundColor: LeafColors.fillBackgroundLight.getColor(),
                    width: size,
                    height: size,
                },
                style,
            ]}
        >
            {icon && <Icon name={icon} size={size / 3} color={typography.color} style={{ paddingBottom: 16 }} />}

            <LeafText typography={typography} wide={false}>
                {label}
            </LeafText>
        </TouchableOpacity>
    );
};

export default LargeMenuButton;
