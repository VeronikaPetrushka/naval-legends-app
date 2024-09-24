import { SafeAreaView } from "react-native"
import Folders from "../components/Folders"

const FoldersScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Folders />
        </SafeAreaView>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FoldersScreen;