import { View, ViewStyle } from "react-native";
import Patient from "../../model/patient/Patient";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import TriageCodeBadge from "./TriageCodeBadge";
import LeafButton from "../base/LeafButton/LeafButton";
import { strings } from "../../localisation/Strings";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafDimensions from "../styling/LeafDimensions";
import { useState } from "react";

interface Props {
    patient: Patient;
    style?: ViewStyle;
}

const AllocateToNurseCard: React.FC<Props> = ({ patient, style }) => {
    // check if allocate button is clicked (false=white, true=green)
    const [active, setActive] = useState(false);
    const timeText = patient.triageCase.arrivalDate
        .toLocaleTimeString("en-AU", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        })
        .toUpperCase();
    const dateText = patient.triageCase.arrivalDate.toDateString();
    const datetimeText = `${timeText}  |  ${dateText}`;
    const idText = patient.mrn.toString();
    return (
        <FlatContainer
            color={LeafColors.fillBackgroundLight}
            style={{
                ...style,
            }}
        >
            <HStack>
                <TriageCodeBadge
                    code={patient.triageCase.triageCode}
                    fillSpace={false}
                    style={{
                        alignSelf: "flex-start",
                        marginRight: 12,
                    }}
                />

                <VStack
                    spacing={LeafDimensions.screenSpacing}
                    style={{
                        flex: 1,
                    }}
                >
                    <View style={{ alignSelf: "flex-start" }}>
                        <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                            {patient.fullName}
                        </LeafText>
                    </View>

                    <VGap size={16} />
                    <LeafText typography={LeafTypography.subscript} wide={false} style={{ alignSelf: "flex-start" }}>
                        ID: {idText}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript} wide={false} style={{ alignSelf: "flex-start" }}>
                        {datetimeText}
                    </LeafText>
                </VStack>
                <LeafButton
                    label={""}
                    wide={false}
                    typography={LeafTypography.title3}
                    type={LeafButtonType.Filled}
                    color={LeafColors.transparent}
                    icon={"plus"}
                    onPress={() => {
                        // change background color of allocate button to green (active = true)
                        setActive(!active);
                        //TODO: allocate patient to selected nurse
                    }}
                    style={{
                        alignSelf: "flex-end",
                        marginRight: 12,
                        borderWidth: 3,
                        borderColor: "#3f4169",
                        backgroundColor: active ? "#7fff00" : "white",
                    }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default AllocateToNurseCard;
