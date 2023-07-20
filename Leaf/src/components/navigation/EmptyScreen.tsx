import { StyleSheet, View } from "react-native"
import LeafText from "../base/LeafText/LeafText"
import LeafTypography from "../styling/LeafTypography"

export const EmptyScreen: React.FC = () => {
    return (
        <View style={styles.emptyScreen}>
            <LeafText wide={false} typography={LeafTypography.body}> No item selected </LeafText>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyScreen: {
        flex: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
})
