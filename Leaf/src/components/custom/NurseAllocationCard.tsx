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
import { useState } from "react";
import FlatContainer from "../containers/FlatContainer";
import LeafIconButton from "../base/LeafIconButton/LeafIconButton";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";

interface Props {
    worker: Worker;
    itemIndex: number;
    selectedIndex: number;
    onSelect: (index: number) => void;
}

const NurseAllocationCard: React.FC<Props> = ({ worker, itemIndex, selectedIndex, onSelect }) => {
    // check if allocate button is clicked (false=white, true=green)
    const isSelected = itemIndex === selectedIndex;
    const idText = worker.id.toString();

    const onPressAllocate = (worker: Worker) => {
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

                {/* 
                    // TODO: replace with checkbox after merge
                */}
                <LeafIconButton
                    icon={isSelected ? "check" : "plus"}
                    size={LeafIconSize.Large}
                    iconColor={isSelected ? LeafColors.textLight : LeafColors.textDark}
                    color={isSelected ? LeafColors.accent : LeafColors.transparent}
                    onPress={() => {
                        onSelect(itemIndex);
                        onPressAllocate(worker);
                    }}
                    style={{
                        alignSelf: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: isSelected ? LeafColors.textLight.getColor() : LeafColors.textDark.getColor(),
                    }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default NurseAllocationCard;
