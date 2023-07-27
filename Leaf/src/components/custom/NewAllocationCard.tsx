import { ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import FloatingContainer from "../containers/FloatingContainer";
import { strings } from "../../localisation/Strings";
import HStack from "../containers/HStack";

interface Props {
    style?: ViewStyle;
    onPress: () => void;
}

const NewAllocationCard: React.FC<Props> = ({ style, onPress }) => {
    return (
        <FloatingContainer color={LeafColors.textBackgroundLight} style={style} onPress={onPress}>
            <HStack>
                <LeafText typography={LeafTypography.title3} style={{ textAlign: "center" }}>
                    {strings("button.allocate")}
                </LeafText>
            </HStack>
        </FloatingContainer>
    );
};

export default NewAllocationCard;
