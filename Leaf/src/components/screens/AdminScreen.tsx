import React, { useEffect } from "react";
import Session from "../../model/Session";
import EmployeeID from "../../model/employee/EmployeeID";
import Nurse from "../../model/employee/Worker";
import StateManager from "../../state/publishers/StateManager";
import LeafColors from "../styling/LeafColors";
import ManageNurseScreen from "./ManageNurseScreen";
import VStack from "../containers/VStack";
import LeafDimensions from "../styling/LeafDimensions";

const AdminScreen: React.FC = () => {
    const [nurse, setNurse] = React.useState<Nurse | null>(Session.instance.getWorker(new EmployeeID("456-456"))); // ID should passed from navigation/side bar

    useEffect(() => {
        StateManager.workersFetched.subscribe(() => {
            setNurse(Session.instance.getWorker(new EmployeeID("456-456")));
        });
        
        Session.instance.fetchAllWorkers();
    }, []);

    const onPressNurse = (nurse) => {
        // TODO: Navigation
        console.log(nurse.firstName);
    };

    return (
        <VStack
            style={{
                flex: 1,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                padding: LeafDimensions.screenPadding,
            }}
        >
            <ManageNurseScreen
                nurse={nurse}
                onPress={() => {
                    onPressNurse(nurse);
                }}
            />
        </VStack>
    );
};

export default AdminScreen;
