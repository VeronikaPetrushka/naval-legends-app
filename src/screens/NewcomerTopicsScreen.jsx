import { SafeAreaView, View } from "react-native"
import NewcomerTopics from "../components/NewComerTopics";

const NewcomerTopicsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <NewcomerTopics />
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

export default NewcomerTopicsScreen;