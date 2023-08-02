import { View, ViewStyle } from "react-native";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import HStack from "../containers/HStack";
import HGap from "../containers/layout/HGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    title: string;
    icon: string; // https://pictogrammers.com/library/mdi/
    style?: ViewStyle;
}

const FormHeader: React.FC<Props> = ({ title, icon, style }) => {
    return (
        <HStack style={{ paddingBottom: 14, ...style }}>
            <View
                style={{
                    borderRadius: 12,
                    padding: 8,
                    backgroundColor: LeafColors.accent.getColor(),
                    alignSelf: "center",
                }}
            >
                <LeafIcon icon={icon} color={LeafColors.textWhite} size={LeafIconSize.Small} />
            </View>

            <HGap size={10} />

            <LeafText typography={LeafTypography.title1.withColor(LeafColors.accent)} wide={false}>
                {title}
            </LeafText>
        </HStack>
    );
};

export default FormHeader;
