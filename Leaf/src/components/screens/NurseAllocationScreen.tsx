import VStack from "../containers/VStack";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import Spacer from "../containers/layout/Spacer";
import NewAllocationCard from "../custom/NewAllocationCard";
import VGap from "../containers/layout/VGap";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import AllocateToNurseScreen from "./AllocateToNurseScreen";
import { strings } from "../../localisation/Strings";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NurseAllocationScreen: React.FC<Props> = ({ navigation }) => {
    const onPressNewAllocation = () => {
        // TODO: New Allocation
        NavigationSession.inst.navigateTo(AllocateToNurseScreen, navigation, strings("header.leader.viewPatients"));
    };

    return (
        <DefaultScreenContainer>
            <VStack>
                <LeafText typography={LeafTypography.body}>TODO: Search Bar</LeafText>

                <VGap size={20} />
                <NewAllocationCard
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

export default NurseAllocationScreen;
