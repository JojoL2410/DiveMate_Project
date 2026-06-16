// app/(tabs)/buddy.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

export default function BuddyScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Buddy-Check </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white },
    text: { fontSize: 16, color: Colors.grey },
});