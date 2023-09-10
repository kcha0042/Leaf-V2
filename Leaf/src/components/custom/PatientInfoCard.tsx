import { View, ViewStyle } from "react-native";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    // Icon name (https://pictogrammers.com/library/mdi/)
    icon: string;
    // Title
    title: string;
    // Spacing between children components
    spacing?: number;
    // No type - can be any component(s)
    children: any;
    // Custom style
    style?: ViewStyle;
}

const PatientInfoCard: React.FC<Props> = ({ icon, title, spacing = 5, children, style }) => {
    return (
        <FlatContainer style={{ width: "100%", ...style }}>
            <HStack spacing={12}>
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

                <LeafText typography={LeafTypography.title1.withColor(LeafColors.accent)} wide={false}>
                    {title}
                </LeafText>
            </HStack>

            <VGap size={12} />

            <VStack spacing={spacing}>{children}</VStack>
        </FlatContainer>
    );
};

export default PatientInfoCard;
