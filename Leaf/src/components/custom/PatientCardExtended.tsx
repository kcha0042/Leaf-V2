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
import { strings } from "../../localisation/Strings";

interface Props {
    patient: Patient;
    style?: ViewStyle;
    onPress: () => void;
}

const PatientCardExtended: React.FC<Props> = ({ patient, style, onPress }) => {
    const idText = patient.mrn.toString();
    const session = patient.sessionAllocated.toString();
    const dateText = patient.triageCase.arrivalDate.toDateString();

    return (
        <FlatContainer onPress={onPress}>
            <HStack>
                <TriageCodeBadge
                    code={patient.triageCase.triageCode}
                    fillSpace={false}
                    style={{
                        alignSelf: "flex-start",
                        marginRight: 12,
                    }}
                />

                <VStack style={{ flex: 1 }}>
                    <LeafText typography={LeafTypography.title3}>{patient.fullName}</LeafText>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("label.id")} {idText}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("label.date")} {dateText}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("label.allocated")} {session}
                    </LeafText>

                    <VGap size={1} />
                </VStack>
            </HStack>
        </FlatContainer>
    );
};

export default PatientCardExtended;
