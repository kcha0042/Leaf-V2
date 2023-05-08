import { ViewStyle } from "react-native";
import LeafColors from "../../core/styles/LeafColors";
import LeafTypography from "../../core/styles/LeafTypography";
import LeafText from "../../core/views/LeafText/LeafText";
import { HStack, VStack } from "native-base";
import LeafFloatingCard from "../../core/containers/LeafFloatingCard/LeafFloatingCard";
import LeafIcon from "../../core/views/LeafIcon/LeafIcon";
import { LeafIconSize } from "../../core/views/LeafIcon/LeafIconSize";

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
            style={style}
        >
            <VStack space={1.5}>
                <HStack space={1}>
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