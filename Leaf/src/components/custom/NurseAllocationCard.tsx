import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import FloatingContainer from "../containers/FloatingContainer";
import Worker from "../../model/employee/Worker";
import VGap from "../containers/layout/VGap";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import { strings } from "../../localisation/Strings";
import LeafDimensions from "../styling/LeafDimensions";
import { useState } from "react";
import FlatContainer from "../containers/FlatContainer";

interface Props {
    worker: Worker;
    style?: ViewStyle;
}

const NurseAllocationCard: React.FC<Props> = ({ worker }) => {
    // check if allocate button is clicked (false=white, true=green)
    const [active, setActive] = useState(false);
    const idText = worker.id.toString();

    const onPressAllocate = (worker) => {
        //TODO: set allocate nurse to patient
        //TODO: Update patient allocated counter
    };

    return (
        <FlatContainer>
            <HStack>
                <VStack
                    style={{
                        flex: 1,
                    }}
                >
                    <LeafText typography={LeafTypography.title3}>{worker.fullName}</LeafText>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript}>{strings("workerCard.id", `${idText}`)}</LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("workerCard.numPatients", `${worker.allocatedPatients.length}`)}
                    </LeafText>
                </VStack>

                <LeafButton
                    label={strings("button.allocate")}
                    wide={false}
                    typography={LeafTypography.buttonSmall}
                    type={LeafButtonType.Filled}
                    color={LeafColors.transparent}
                    onPress={() => {
                        // change background color of allocate button to green (active = true)
                        setActive(!active);
                        onPressAllocate(worker);
                    }}
                    style={{
                        alignSelf: "center",
                        borderRadius: 15,
                        marginRight: 12,
                        borderWidth: 1,
                        borderColor: "#3f4169",
                        backgroundColor: active ? "#7fff00" : "white",
                    }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default NurseAllocationCard;
