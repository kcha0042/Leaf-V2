import { ViewStyle } from "react-native";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import FloatingContainer from "../containers/FloatingContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    // Icon name (https://pictogrammers.com/library/mdi/)
    icon: string;
    // Title
    title: string;
    // No type - can be any component(s)
    children: any;
    // Custom style
    style?: ViewStyle;
}

const FormCard: React.FC<Props> = ({ icon, title, children, style }) => {
    return (
        <FloatingContainer
            color={LeafColors.textBackgroundLight}
            style={{
                ...style,
                flexDirection: "row",
            }}
        >
            <VStack spacing={1.5} style={{ width: "100%" }}>
                <HStack spacing={1} style={{ width: "100%" }}>
                    <LeafIcon icon={icon} color={LeafColors.textDark} size={LeafIconSize.Small} />

                    <LeafText typography={LeafTypography.title4} wide={false}>
                        {title}
                    </LeafText>
                </HStack>

                {children}
            </VStack>
        </FloatingContainer>
    );
};

export default FormCard;
