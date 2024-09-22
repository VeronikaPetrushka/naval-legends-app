import { SafeAreaView, View } from "react-native"
import Library from "../components/Library"
import MenuPanel from "../components/MenuPanel"

const LibraryScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Library />
            <View style={styles.menu}>
                <MenuPanel />
            </View>
        </SafeAreaView>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },

    menu: {
        position: 'absolute',
        width: "100%",
        bottom: 30
    }
}

export default LibraryScreen;