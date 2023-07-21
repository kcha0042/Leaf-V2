import { ViewStyle } from "react-native";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafText from "../../base/LeafText/LeafText";
import FloatingContainer from "../../containers/FloatingContainer";
import { strings } from "../../../localisation/Strings";

interface Props {
    style?: ViewStyle;
    onPress: () => void;
}

const AllocateCard: React.FC<Props> = ({ style, onPress }) => {
    return (
        <FloatingContainer color={LeafColors.textBackgroundLight} style={style} onPress={onPress}>
            <HStack>
                <LeafText typography={LeafTypography.cardTitle} style={{ textAlign: "center" }}>
                    {strings("button.allocate")}
                </LeafText>
            </HStack>
        </FloatingContainer>
    );
};

export default AllocateCard;
