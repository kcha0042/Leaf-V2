import { View, ViewStyle } from "react-native";
import Patient from "../../model/patient/Patient";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import TriageCodeBadge from "./TriageCodeBadge";
import LeafButton from "../base/LeafButton/LeafButton";
import { strings } from "../../localisation/Strings";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafDimensions from "../styling/LeafDimensions";
import LeafIconButton from "../base/LeafIconButton/LeafIconButton";
import VGap from "../containers/layout/VGap";

interface Props {
    patient: Patient;
    style?: ViewStyle;
}

const AllocatedPatientsCard: React.FC<Props> = ({ patient, style }) => {
    const idText = patient.mrn.toString();
    const dateText = patient.triageCase.arrivalDate.toDateString();

    return (
        <FlatContainer
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
                        Date: {dateText}
                    </LeafText>
                </VStack>
                {/* <LeafButton
                    label={strings("button.deletePatient")}
                    wide={false}
                    typography={LeafTypography.title3}
                    type={LeafButtonType.Filled}
                    color={LeafColors.transparent}
                    onPress={() => {
                        //TODO: REMOVE MRN FROM WORKER
                    }}
                    style={{
                        alignSelf: "center",
                        marginRight: 12,
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: "#3f4169",
                    }}
                /> */}
                <LeafIconButton icon="trash-can-outline" color={LeafColors.accent} size={40} style={{backgroundColor: "#e03131"}} onPress={() => {}}/>
            </HStack>
        </FlatContainer>
    );
};

export default AllocatedPatientsCard;
