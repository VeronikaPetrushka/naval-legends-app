import { SafeAreaView } from "react-native"
import BattleMap from "../components/BattleMap"

const BattleMapScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <BattleMap />
        </SafeAreaView>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default BattleMapScreen;