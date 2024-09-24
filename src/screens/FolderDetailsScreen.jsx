import { SafeAreaView } from "react-native"
import FolderDetails from "../components/FolderDetails"

const FolderDetailsScreen = ({route}) => {
    const { folder } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <FolderDetails folder={folder}/>
        </SafeAreaView>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FolderDetailsScreen;