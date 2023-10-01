import { View, ViewStyle } from "react-native";
import { strings } from "../../localisation/Strings";
import Patient from "../../model/patient/Patient";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import TriageCodeBadge from "./TriageCodeBadge";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spacer from "../containers/layout/Spacer";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";
import LeafTextButton from "../base/LeafTextButton/LeafTextButton";
import Worker from "../../model/employee/Worker";
import { useEffect } from "react";
import Session from "../../model/session/Session";
import LeafChip from "../base/LeafChip/LeafChip";

interface Props {
    patient: Patient;
    style?: ViewStyle;
}

const AllocatedPatientsCard: React.FC<Props> = ({ patient, style }) => {
    const idText = patient.mrn.toString();
    const dateText = patient.triageCase.arrivalDate.toDateString();
    const worker = Session.inst.getActiveWorker();

    const buttonTypography = LeafTypography.subscript;
    buttonTypography.leafColor = LeafColors.textError;
    buttonTypography.weight = LeafFontWeight.Bold;

    const removePatient = () => {
        if (worker != null) {
            Session.inst.unallocatePatient(patient, worker);
        }
    };

    const typography = LeafTypography.subscriptLabel;
    typography.leafColor = LeafColors.textDark;

    const formatTime = (date: Date): string => {
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return `${hours < 10 ? "0".concat(hours.toString()) : hours.toString()}:${
            minutes < 10 ? "0".concat(minutes.toString()) : minutes.toString()
        }`;
    };

    return (
        <FlatContainer>
            <HStack
                style={{
                    flex: 1,
                }}
            >
                <TriageCodeBadge
                    code={patient.triageCase.triageCode}
                    fillSpace={false}
                    style={{
                        alignSelf: "flex-start",
                        marginRight: 12,
                    }}
                />

                <VStack
                    style={{
                        flex: 1,
                    }}
                >
                    <HStack
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <LeafText wide={false} typography={LeafTypography.title3} style={{ alignSelf: "flex-start" }}>
                            {patient.fullName}
                        </LeafText>
                        <Spacer />

                        <LeafTextButton
                            label={strings("button.remove")}
                            typography={buttonTypography}
                            onPress={removePatient}
                        />
                    </HStack>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("label.id")} {idText}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("label.date")} {dateText}
                    </LeafText>

                    <VGap size={16} />

                    <HStack spacing={10}>
                        {patient.events.map((event) => (
                            <LeafChip
                                key={event.id.toString()}
                                children={
                                    <LeafText
                                        wide={false}
                                        typography={typography}
                                    >{`${event.title.toString()} @ ${formatTime(event.triggerTime)}`}</LeafText>
                                }
                                color={LeafColors.fillBackgroundAccent}
                            />
                        ))}
                    </HStack>
                </VStack>
            </HStack>
        </FlatContainer>
    );
};

export default AllocatedPatientsCard;
