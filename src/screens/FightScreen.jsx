import { SafeAreaView, View } from "react-native"
import Fight from "../components/Fight"

const FightScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Fight />
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