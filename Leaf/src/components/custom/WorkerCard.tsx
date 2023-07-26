import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import FloatingContainer from "../containers/FloatingContainer";
import Worker from "../../model/employee/Worker";
import VGap from "../containers/layout/VGap";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";

interface Props {
    worker: Worker;
    style?: ViewStyle;
    onPress: () => void;
}

const WorkerCard: React.FC<Props> = ({ worker, style, onPress }) => {
    // TODO: Add Worker full name instead of First Name
    const idText = worker.id.toString();
    return (
        <FloatingContainer color={LeafColors.textBackgroundLight} style={style} onPress={onPress}>
            <HStack>
                <VStack>
                    <View style={{ alignSelf: "flex-start" }}>
                        <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                            {worker.fullName}
                        </LeafText>
                    </View>

                    <VGap size={6} />

                    <LeafText typography={LeafTypography.subscript}>{"ID: " + idText}</LeafText>

                    <VGap size={6} />

                    <LeafText typography={LeafTypography.subscript}>{"TO DO: Allocated Patients"}</LeafText>
                </VStack>
            </HStack>
        </FloatingContainer>
    );
};

export default WorkerCard;
