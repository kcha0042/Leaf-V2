import { ViewStyle } from "react-native";
import LeafColors from "../../core/styles/LeafColors";
import LeafTypography from "../../core/styles/LeafTypography";
import LeafText from "../../core/views/LeafText/LeafText";
import LeafFloatingCard from "../../core/containers/LeafFloatingCard/LeafFloatingCard";
import LeafIcon from "../../core/views/LeafIcon/LeafIcon";
import { LeafIconSize } from "../../core/views/LeafIcon/LeafIconSize";
import HStack from "../../core/containers/HStack";
import VStack from "../../core/containers/VStack";

interface Props {
    // Icon name (https://pictogrammers.com/library/mdi/)
    icon: string;
    // Title
    title: string;
    // No type - can be any component(s)
    children; 
    // Custom style
    style?: ViewStyle;
}

const FormCard: React.FC<Props> = ({ 
    icon,
    title,
    children,
    style,
}) => {
    return (
        <LeafFloatingCard 
            color={LeafColors.textBackgroundLight}
            style={{
                ...style,
                flexDirection: 'row',
            }}
        >
            <VStack spacing={1.5} style={{ width: "100%" }}>
                <HStack spacing={1} style={{ width: "100%" }}>
                    <LeafIcon 
                        icon={icon}
                        color={LeafColors.textDark}
                        size={LeafIconSize.formCardTitle}
                    />

                    <LeafText
                        typography={LeafTypography.formCardTitle} 
                        wide={false}
                    >
                        {title}
                    </LeafText>
                </HStack>

                {children}
            </VStack>
        </LeafFloatingCard>
    );
}

export default FormCard;