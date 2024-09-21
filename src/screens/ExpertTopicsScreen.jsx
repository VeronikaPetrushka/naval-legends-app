import { SafeAreaView, View } from "react-native"
import ExpertTopics from "../components/ExpertTopics";

const ExpertTopicsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ExpertTopics />
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

export default ExpertTopicsScreen;