import { SafeAreaView } from "react-native"
import DailyBonus from "../components/DailyBonus"

const DailyBonusScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <DailyBonus />
        </SafeAreaView>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DailyBonusScreen;