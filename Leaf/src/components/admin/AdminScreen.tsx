import { VStack } from "native-base";
import React, { useEffect } from "react";
import LeafDimensions from "../core/styles/LeafDimensions";
import Nurse from "../../model/employee/Worker";
import Session from "../../model/Session";
import StateManager from "../../state/publishers/StateManager";
import EmployeeID from "../../model/employee/EmployeeID";
import ManageNurseScreen from "./ManageNurseScreen";

const AdminScreen: React.FC = () => {
    const [nurse, setNurse] = React.useState<Nurse>(Session.instance.getWorker(new EmployeeID("456-456")));

    StateManager.patientsFetched.subscribe(() => {
        setNurse(Session.instance.getWorker(new EmployeeID("456-456")));
    });

    useEffect(() => {
        Session.instance.fetchAllWorkers();
    }, []);

    console.log(nurse);

    const onPressNurse = (nurse) => {
        // TODO: Navigation
        console.log(nurse.firstName);
    }

    return (
        <VStack style={{ flex: 1 }} space={LeafDimensions.screenSpacing}>
            <ManageNurseScreen
                nurse={nurse}
                onPress={() => { onPressNurse(nurse) }} />
        </VStack>
    );

}


export default AdminScreen;