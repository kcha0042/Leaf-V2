import { Spacer, VStack } from "native-base";
import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafBaseDimensions from "../core/styles/LeafBaseDimensions";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";
import LeafColors from "../core/styles/LeafColors";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import AllocatePatientsScreen from "./AllocatePatientsScreen";

const LeaderScreen: React.FC = () => {
    return (
        <AllocatePatientsScreen />
    );
}

export default LeaderScreen;