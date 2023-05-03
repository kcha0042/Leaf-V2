import React from "react";
import YourPatientsScreen from "./YourPatientsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import LeafColors from "../core/styles/LeafColors";
import NewTriageScreen from "./NewTriageScreen";

const WorkerScreen: React.FC = () => {
    // TODO: Tab bar implementation
    return (
        <SafeAreaView style={style.safeArea}>
            <NewTriageScreen />
            {/* <YourPatientsScreen /> */}
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: LeafColors.screenBackgroundSemiLight.getColor(),
    }
});

export default WorkerScreen;