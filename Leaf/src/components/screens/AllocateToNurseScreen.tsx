import VStack from "../containers/VStack";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import Spacer from "../containers/layout/Spacer";
import AllocateCard from "../custom/AllocateCard";
import VGap from "../containers/layout/VGap";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllocateToNurseScreen: React.FC<Props> = ({ navigation }) => {
    const onPressNewAllocation = () => {
        // TODO: New Allocation
    };

    return (
        <DefaultScreenContainer>
            <VStack>
                <LeafText typography={LeafTypography.body}>TODO: Search Bar</LeafText>

                <VGap size={20} />
                <AllocateCard
                    onPress={() => {
                        onPressNewAllocation;
                    }}
                />

                <VGap size={20} />
                <LeafText typography={LeafTypography.body}>TODO: Remove patient card</LeafText>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default AllocateToNurseScreen;
