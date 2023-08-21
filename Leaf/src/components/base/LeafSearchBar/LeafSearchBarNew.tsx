import React, { useEffect, useRef } from "react";
import { Platform, TextInput, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafColor from "../../styling/color/LeafColor";
import LeafText from "../LeafText/LeafText";
import LeafIcon from "../LeafIcon/LeafIcon";

interface Props {
    label?: string;
    textColor?: LeafColor;
    color?: LeafColor;
    wide?: boolean;
    valid?: boolean;
    style?: ViewStyle;
    data;
    onTextChange: (text: string) => void;
    setData: (data) => void;
}

const LeafSearchBarNew: React.FC<Props> = ({
    label = "Search",
    textColor = LeafColors.textDark,
    color = LeafColors.textBackgroundAccent,
    wide = true,
    valid = undefined,
    data,
    style,
    onTextChange,
    setData
}) => {

    useEffect(() => {
        setFilteredData(data);
    }, [data])

    const [searchQuery, setSearchQuery] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(data);
    const textInputRef = useRef(null);
    const typography = LeafTypography.body.withColor(textColor);
    if (valid != undefined) {
        typography.withColor(valid ? LeafColors.textSuccess : LeafColors.textError);
    }
    const labelTypography = LeafTypography.body.withColor(LeafColors.textSemiDark);

    // Here we convert each object(item) in the data array to string
    // Then we will do a filter to check if our search query string matches (or almost) our data
    const cleanupQuery = searchQuery => searchQuery.replace(/\s/g, '');
    const calculateLevenshteinDistance = (source, target) => {
        const sourceLength = source.length;
        const targetLength = target.length;

        const distanceMatrix = Array.from({ length: sourceLength + 1}, (_,i) => Array(targetLength + 1).fill(i));
        
        for (let j = 1; j <= targetLength; j++) {
            distanceMatrix[0][j] = j;
          };
        
        for (let i = 1; i <= sourceLength; i++) {
            for (let j = 1; j <= targetLength; j++) {
              const cost = source[i - 1] === target[j - 1] ? 0 : 1;
              distanceMatrix[i][j] = Math.min(
                distanceMatrix[i - 1][j] + 1,
                distanceMatrix[i][j - 1] + 1,
                distanceMatrix[i - 1][j - 1] + cost
                );
            }
        }

        return distanceMatrix[sourceLength][targetLength];
    }

    const isFuzzyMatch = (query, data, maxDistance = 5) => {
        const matchFirstName = calculateLevenshteinDistance(query, data?.firstName);
        const matchLastName = calculateLevenshteinDistance(query, data?.lastName);
        return matchFirstName <= maxDistance || matchLastName <= maxDistance;
    }

    const handleSearch = searchQuery => {
        const cleanQuery = cleanupQuery(searchQuery);
        let filtered = data.filter(item =>
            cleanupQuery(item?.fullName).toLowerCase().includes(cleanQuery.toLowerCase())
        );
        if (filtered.length == 0){ //if doesn't match, do a fuzzy search (Levenshtein Algorithm)
            console.log("fuzzy");
            filtered = data.filter(item => isFuzzyMatch(cleanQuery, item));
        }
        setFilteredData(filtered);
        setData(filtered);
      };

      console.log("output from setFilteredData", filteredData);

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
};

export default LeafSearchBarNew;
