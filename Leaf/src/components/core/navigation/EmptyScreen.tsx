import { View } from "native-base"
import { StyleSheet } from "react-native"
import LeafText from "../views/LeafText/LeafText"
import LeafTypography from "../styles/LeafTypography"

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
