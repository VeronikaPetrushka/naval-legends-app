import { SafeAreaView, View } from "react-native"
import Analysis from "../components/Analysis"

const FightScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Analysis />
        </SafeAreaView>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FightScreen;