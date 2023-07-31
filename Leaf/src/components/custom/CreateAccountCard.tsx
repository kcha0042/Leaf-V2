import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import FloatingContainer from "../containers/FloatingContainer";
import Worker from "../../model/employee/Worker";
import VGap from "../containers/layout/VGap";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import { strings } from "../../localisation/Strings";

interface Props {
    worker: Worker;
    display?: Boolean;
    onPress: () => void;
}

const CreateAccountCard: React.FC<Props> = ({ worker, display, onPress }) => {
    // TODO: Add Worker full name instead of First Name
    const idText = worker.id.toString();
    if (!display) {
        return null;
    }
    return (
        <FloatingContainer color={LeafColors.textBackgroundLight} onPress={onPress}>
            <HStack>
                <VStack>
                    <View style={{ alignSelf: "flex-start" }}>
                        <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                            Account Created
                        </LeafText>
                    </View>

                    <VGap size={6} />

                    <LeafText typography={LeafTypography.subscript} wide={false}>
                        {"ID: " + idText + strings("operation.activeAccount")}
                    </LeafText>
                </VStack>
            </HStack>
        </FloatingContainer>
    );
};

export default CreateAccountCard;
