import React, { useEffect, useRef } from "react";
import { Platform, TextInput, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafColor from "../../styling/color/LeafColor";
import LeafText from "../LeafText/LeafText";
import LeafIcon from "../LeafIcon/LeafIcon";

interface Props<T> {
    label?: string;
    textColor?: LeafColor;
    color?: LeafColor;
    wide?: boolean;
    valid?: boolean;
    style?: ViewStyle;
    data: T[];
    onTextChange: (text: string) => void;
    setData: (data: T[]) => void;
    dataToString: (data: T) => string;
    maxDistance?: number;
}

function LeafSearchBarNew<T>({
    data,
    style,
    onTextChange,
    setData,
    textColor = LeafColors.textDark,
    color = LeafColors.textBackgroundAccent,
    dataToString,
    wide = true,
    valid = undefined,
    label = "Search",
    maxDistance = 7,
}: Props<T>) {
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const [searchQuery, setSearchQuery] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(data);
    const textInputRef = useRef(null);
    const typography = LeafTypography.body.withColor(textColor);
    if (valid != undefined) {
        typography.withColor(valid ? LeafColors.textSuccess : LeafColors.textError);
    }
    const labelTypography = LeafTypography.body.withColor(LeafColors.textSemiDark);

    const cleanupQuery = (searchQuery) => searchQuery.replace(/\s/g, "");
    const calculateLevenshteinDistance = (source, target) => {
        const sourceLength = source.length;
        const targetLength = target.length;
    
        const distanceMatrix = Array.from({ length: sourceLength + 1 }, (_, row) => Array(targetLength + 1).fill(row));
    
        for (let columnIndex = 1; columnIndex <= targetLength; columnIndex++) {
            distanceMatrix[0][columnIndex] = columnIndex;
        }
    
        for (let rowIndex = 1; rowIndex <= sourceLength; rowIndex++) {
            for (let columnIndex = 1; columnIndex <= targetLength; columnIndex++) {
                const cost = source[rowIndex - 1] === target[columnIndex - 1] ? 0 : 1;
                distanceMatrix[rowIndex][columnIndex] = Math.min(
                    distanceMatrix[rowIndex - 1][columnIndex] + 1,
                    distanceMatrix[rowIndex][columnIndex - 1] + 1,
                    distanceMatrix[rowIndex - 1][columnIndex - 1] + cost,
                );
            }
        }
    
        return distanceMatrix[sourceLength][targetLength];
    };

    const isFuzzyMatch = (query, data, localMaxDistance) => {
        const calculateMatch = calculateLevenshteinDistance(query, dataToString(data));
        return calculateMatch <= localMaxDistance;
    };

    const handleSearch = (searchQuery) => {
        const cleanQuery = cleanupQuery(searchQuery);
        let filtered = data.filter((item) =>
            cleanupQuery(dataToString(item)).toLowerCase().includes(cleanQuery.toLowerCase()),
        );
        if (filtered.length == 0) {
            //if doesn't match, do a fuzzy search (Levenshtein Algorithm)
            filtered = data.filter((item) => isFuzzyMatch(cleanQuery, item, maxDistance));
        }
        setFilteredData(filtered);
        setData(filtered);
    };

    return (
        <View
            style={[
                wide ? { width: "100%" } : { alignSelf: "center" },
                {
                    flexDirection: "row",
                    backgroundColor: color.getColor(),
                    borderRadius: 30,
                    borderColor: LeafColors.outlineTextBackgroundAccent.getColor(),
                    height: 55,
                    borderWidth: 1,
                },
            ]}
        >
            <LeafIcon
                icon="magnify"
                size={26}
                color={LeafColors.textDark}
                style={{ alignSelf: "center", display: "flex", marginLeft: 16 }}
            />

            <TouchableWithoutFeedback
                style={{
                    position: "absolute",
                    flexDirection: "row",
                    height: "100%",
                    paddingHorizontal: 6,
                    ...Platform.select({
                        web: { cursor: "text" },
                    }),
                }}
                onPress={() => {
                    textInputRef.current.focus();
                }}
            >
                <LeafText
                    typography={labelTypography}
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {searchQuery.length == 0 ? label : ""}
                </LeafText>
            </TouchableWithoutFeedback>

            <TextInput
                ref={textInputRef}
                style={[
                    wide ? { width: "100%" } : { alignSelf: "center" },
                    {
                        paddingVertical: 12,
                        paddingHorizontal: 6,
                        ...Platform.select({
                            web: { outlineStyle: "none" },
                        }),
                    },
                    typography.getStylesheet(),
                    style,
                ]}
                onChangeText={(searchQuery) => {
                    setSearchQuery(searchQuery);
                    onTextChange(searchQuery);
                    handleSearch(searchQuery);
                }}
                value={searchQuery}
            />
        </View>
    );
}

export default LeafSearchBarNew;
