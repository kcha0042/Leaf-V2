import React from "react";
import LeafColors from "../styling/LeafColors";
import AllocatePatientsScreen from "./AllocatePatientsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const LeaderScreen: React.FC = () => {
    return (
        <SafeAreaView style={style.safeArea}>
            <AllocatePatientsScreen />
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: LeafColors.screenBackgroundLight.getColor()
    }
});

export default LeaderScreen;