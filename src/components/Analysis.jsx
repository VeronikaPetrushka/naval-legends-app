import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Analysis = () => {
    const navigation = useNavigation();

    const arrow = 'arrow';

    const handleGoBack = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <ImageBackground
        source={require('../assets/background/fight.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.goBackIcon}
                onPress={handleGoBack}
                >
                    <Icons type={arrow}/>
            </TouchableOpacity>
            <ScrollView style={styles.scroll}>
            <Text style={styles.title}>Analysis of the Battle of Trafalgar</Text>
            <Text style={styles.intro}>
                The Battle of Trafalgar was a decisive naval engagement during the Napoleonic Wars, 
                and its outcomes established British naval dominance for decades to come. 
                Admiral Nelson's strategic choices were crucial to achieving victory. 
                Let's examine the key aspects of this battle and analyze why the decisions made were so effective.
            </Text>

            <Text style={styles.subtitle}>Deployment of Forces: Division into Two Columns</Text>
            <Text style={styles.strategy}>
                Strategy: Nelson decided to split his fleet into two columns and attack the Franco-Spanish fleet from the sides, breaking their line. 
                This maneuver was highly risky, as ships could be subjected to intense crossfire during a frontal attack.
            </Text>
            <Text style={styles.analysis}>
                Analysis: This approach was unconventional and unexpected for the enemy. 
                The division of the fleet allowed Nelson to encircle the enemy and disrupt their battle line. 
                Although British ships suffered losses during the attack, this strategy fractured the coordination of the Franco-Spanish fleet, 
                making it vulnerable to further assaults.
            </Text>

            <Text style={styles.subtitle}>Commencement of the Attack: Rapid Close Engagement</Text>
            <Text style={styles.strategy}>
                Strategy: Nelson chose to close rapidly with the enemy ships to avoid prolonged fire from a distance and initiate close combat.
            </Text>
            <Text style={styles.analysis}>
                Analysis: Close contact allowed British ships to exploit their advantage in close-quarter battles. 
                The Franco-Spanish fleet was unprepared for such an event and could not effectively organize its defense. 
                Additionally, rapid closing reduced losses from artillery fire, as distant shots were less accurate.
            </Text>

            <Text style={styles.subtitle}>Climax of the Battle: Focusing on the Flagships</Text>
            <Text style={styles.strategy}>
                Strategy: Nelson decided to concentrate his main forces on the enemy's flagship vessels to break their morale and coordination.
            </Text>
            <Text style={styles.analysis}>
                Analysis: Capturing or destroying the enemy's flagships often leads to a loss of command and control for the remaining fleet. 
                Nelson’s decision quickly demoralized the opponent, leading to chaos among the Franco-Spanish forces and ultimately their defeat. 
                This strategy also minimized overall British losses, as many enemy ships quickly surrendered or attempted to flee after the loss of their flagships.
            </Text>

            <Text style={styles.subtitle}>Conclusion of the Battle: Pursuit and Destruction</Text>
            <Text style={styles.strategy}>
                Strategy: Once the enemy was broken, Nelson ordered his ships to pursue the remnants of the Franco-Spanish fleet and destroy them.
            </Text>
            <Text style={styles.analysis}>
                Analysis: This step ensured that no enemy ships could escape defeat and regroup for future engagements. 
                It also reinforced the psychological impact of the victory: the enemy was completely shattered, rather than simply retreating. 
                However, this maneuver was risky as pursuit could disperse British forces, but Nelson’s well-coordinated fleet avoided these risks.
            </Text>

            <Text style={styles.subtitle}>Historical Context and Lessons</Text>
            <Text style={styles.analysis}>
                The Battle of Trafalgar affirmed Nelson's mastery as one of the greatest admirals in history. 
                His unconventional decisions, willingness to take risks, and deep understanding of naval warfare psychology led to a decisive victory. 
                This battle solidified Britain's dominance at sea and provided a strategic advantage for the remainder of the Napoleonic Wars. 
                The key lessons from this battle include the importance of tactical flexibility, the ability to make swift decisions in response to changing battlefield conditions, 
                and the significance of psychological advantage in military conflicts. 
                The Battle of Trafalgar serves as a classic example of how thoughtful strategy can compensate for numerical disadvantages and lead to victory even under the most challenging circumstances.
            </Text>
        </ScrollView>
        </View>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 90,
        paddingBottom : 90
    },
    scroll: {
        width: '100%',
        height: '100%'
    },
    backgroundImage: {
        width: '100%',
        height: '110%',
        justifyContent: 'center',
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        textAlign: 'center'
    },
    intro: {
        fontSize: 19,
        marginBottom: 15,
        color: 'white',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 10,
        color: 'white',
        textAlign: 'center'
    },
    strategy: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
        textAlign: 'center'
    },
    analysis: {
        fontSize: 19,
        marginBottom: 15,
        color: 'white',
        textAlign: 'center'
    },
    goBackIcon: {
        width: 60,
        height: 60,
        padding: 10,
        position: 'absolute',
        top: 15,
        left: 10
    }
});

export default Analysis;
