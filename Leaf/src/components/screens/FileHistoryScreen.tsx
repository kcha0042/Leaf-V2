import React, { useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { strings } from "../../localisation/Strings";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import HStack from "../containers/HStack";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafCheckboxStatic from "../base/LeafCheckbox/LeafCheckboxStatic";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";
import { useNotificationSession } from "../base/LeafDropNotification/NotificationSession";
import reports, { Report } from "../../preset_data/ReportData";
import ExportReportCard from "../custom/ExportReportCard";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const FileHistoryScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [selectAll, setSelectAll] = useState(false);
    const [notify, setNotify] = useState(false);
    const { showErrorNotification, showSuccessNotification } = useNotificationSession();

    const notifyHandler = () => {
        if (!selectedReport) {
            setNotify(true);
            showErrorNotification(strings("label.noReportSelected"));
        } else {
            showSuccessNotification(strings("feedback.successExportReport"));
        }
    };

    const toggleReportSelect = (report: Report) => {
        setNotify(false);
        if (selectedReport && selectedReport.name === report.name) {
            setSelectedReport(null);
        } else {
            setSelectedReport(report);
        }
    };

    const toggleSelectAll = () => {
        setNotify(false);
        if (selectAll) {
            setSelectedReport(null);
        } else {
            setSelectedReport(reports.length > 0 ? reports[0] : null);
        }
        setSelectAll(!selectAll);
    };

    return (
        <DefaultScreenContainer>
            <VStack spacing={16}>
                <LeafButton
                    label="Export"
                    icon="file-export"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    onPress={async () => {
                        notifyHandler();
                        console.log("Exporting report: ", selectedReport);
                    }}
                />
                <HStack
                    spacing={16}
                    style={{
                        alignItems: "center",
                    }}
                >
                    <LeafText
                        typography={LeafTypography.body.withColor(LeafColors.textSemiDark)}
                        style={{
                            flex: 1,
                            color: notify ? LeafColors.textError.getColor() : LeafColors.accent.getColor(),
                        }}
                    >
                        {selectedReport === null
                            ? strings("label.noReportSelected")
                            : strings("label.reportSelected")}
                    </LeafText>
                </HStack>
            </VStack>

            <VGap size={12} />

            <VStack>
                <ScrollView style={{ flex: 1, width: "100%" }}>
                    <FlatList
                        data={reports}
                        renderItem={({ item: report }) => (
                            <ExportReportCard
                                report={report}
                                isSelected={selectedReport?.name === report.name}
                                onPress={() => toggleReportSelect(report)}
                            />
                        )}
                        keyExtractor={(report) => report.name}
                        ItemSeparatorComponent={() => <VGap size={LeafDimensions.cardSpacing} />}
                        scrollEnabled={false}
                        style={{
                            width: "100%",
                            overflow: "visible",
                            flexGrow: 0,
                        }}
                    />
                </ScrollView>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default FileHistoryScreen;
