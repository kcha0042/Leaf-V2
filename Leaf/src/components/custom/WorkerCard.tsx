import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import Worker from "../../model/employee/Worker";
import VGap from "../containers/layout/VGap";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import FlatContainer from "../containers/FlatContainer";
import { strings } from "../../localisation/Strings";

interface Props {
    worker: Worker;
    style?: ViewStyle;
    onPress: () => void;
}

const WorkerCard: React.FC<Props> = ({ worker, style, onPress }) => {
    const idText = worker.id.toString();
    return (
        <FlatContainer onPress={onPress}>
            <VStack style={{ flex: 1 }}>
                <LeafText typography={LeafTypography.title3}>{worker.fullName}</LeafText>

                <VGap size={16} />

                <LeafText typography={LeafTypography.subscript}>{strings("workerCard.id", `${idText}`)}</LeafText>

                <LeafText typography={LeafTypography.subscript}>
                    {strings("workerCard.numPatients", `${worker.allocatedPatients.length}`)}
                </LeafText>
            </VStack>
        </FlatContainer>
    );
};

export default WorkerCard;
