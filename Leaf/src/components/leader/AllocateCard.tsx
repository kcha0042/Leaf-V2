import { ViewStyle } from "react-native";
import LeafColors from "../core/styles/LeafColors";
import LeafTypography from "../core/styles/LeafTypography";
import LeafText from "../core/views/LeafText/LeafText";
import { HStack, Spacer, VStack, View } from "native-base";
import LeafFloatingCard from "../core/containers/LeafFloatingCard/LeafFloatingCard";
import { strings } from "../../localisation/Strings";


interface Props {
    style?: ViewStyle;
    onPress: () => void;
}

const AllocateCard: React.FC<Props> = ({ 
    style,
    onPress
}) => {
    return(
        <LeafFloatingCard 
            color={LeafColors.textBackgroundLight}
            style={style}
            onPress={onPress}
        >
            <HStack>
            <LeafText typography={LeafTypography.cardTitle} style={{ textAlign: 'center'}}>
                    {strings("button.allocate")}
                </LeafText>
            </HStack>
        </LeafFloatingCard>
    );
}

export default AllocateCard;