import { VStack } from "native-base";
import React, { useEffect } from "react";
import LeafDimensions from "../core/styles/LeafDimensions";
import Nurse from "../../model/employee/Worker";
import Session from "../../model/Session";
import StateManager from "../../state/publishers/StateManager";
import EmployeeID from "../../model/employee/EmployeeID";
import ManageNurseScreen from "./ManageNurseScreen";
import LeafColors from "../core/styles/LeafColors";
import LeafBaseDimensions from "../core/styles/LeafBaseDimensions";

const AdminScreen: React.FC = () => {
    const [nurse, setNurse] = React.useState<Nurse | null>(Session.instance.getWorker(new EmployeeID("456-456"))); // ID should passed from navigation/side bar

    StateManager.workersFetched.subscribe(() => {
        setNurse(Session.instance.getWorker(new EmployeeID("456-456")));
    });

    useEffect(() => {
        Session.instance.fetchAllWorkers();
    }, []);

    const onPressNurse = (nurse) => {
        // TODO: Navigation
        console.log(nurse.firstName);
    }

    return (
        <VStack 
            style={{ 
                flex: 1,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                padding: LeafBaseDimensions.screenPadding
            }}
        >
            <ManageNurseScreen
                nurse={nurse}
                onPress={() => { onPressNurse(nurse) }}
            />
        </VStack>
    );

}


export default AdminScreen;