import React, { useEffect } from "react";
import Session from "../../model/Session";
import EmployeeID from "../../model/employee/EmployeeID";
import Nurse from "../../model/employee/Worker";
import StateManager from "../../state/publishers/StateManager";
import LeafBaseDimensions from "../core/styles/LeafBaseDimensions";
import LeafColors from "../core/styles/LeafColors";
import ManageNurseScreen from "./ManageNurseScreen";

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