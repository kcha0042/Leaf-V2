import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import Worker from "../../model/employee/Worker";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import { strings } from "../../localisation/Strings";
import LeafIcon from "../base/LeafIcon/LeafIcon";

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
        <FlatContainer color={LeafColors.fillBackgroundLight} onPress={onPress}>
            <HStack>
                <VStack>
                    <View style={{ alignSelf: "flex-start" }}>
                        <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                            {strings("label.accountCreated")}
                        </LeafText>

                        <LeafText typography={LeafTypography.subscript} wide={false}>
                            {strings("label.id") + idText + strings("operation.activeAccount")}
                        </LeafText>
                    </View>
                </VStack>
                <LeafIcon
                    icon="check-circle"
                    color={LeafColors.textSuccess}
                    size={32}
                    style={{ position: "absolute", right: 0 }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default CreateAccountCard;
