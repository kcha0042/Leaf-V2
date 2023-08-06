import { Text, View } from "react-native";
import { strings } from "../../localisation/Strings";
import Worker from "../../model/employee/Worker";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    worker: Worker;
    display?: Boolean;
    onPress: () => void;
}

const CreateAccountCard: React.FC<Props> = ({ worker, display, onPress }) => {
    const idText = worker.id.toString();
    if (!display) {
        return null;
    }
    return (
        <FlatContainer color={LeafColors.fillBackgroundLight} style={{ width: "100%" }} onPress={onPress}>
            <VStack
                style={{
                    flexWrap: "nowrap",
                }}
            >
                <HStack style={{ width: "100%" }}>
                    <VStack spacing={4} style={{ flex: 1 }}>
                        <LeafText typography={LeafTypography.title3}>{strings("label.accountCreated")}</LeafText>

                        <LeafText typography={LeafTypography.subscript}>{strings("label.id") + idText}</LeafText>
                    </VStack>

                    <LeafIcon icon="check-bold" color={LeafColors.textSuccess} size={LeafIconSize.Large} />
                </HStack>

                <VGap size={22} />

                <LeafText typography={LeafTypography.subscript}>{strings("operation.activeAccount")}</LeafText>
            </VStack>
        </FlatContainer>
    );
};

export default CreateAccountCard;
