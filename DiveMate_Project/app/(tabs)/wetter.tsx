// app/(tabs)/wetter.tsx
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/wetterStyles';

type DayEntry = {
    time: string;
    icon: keyof typeof Ionicons.glyphMap;
    condition: string;
    rating: string;
    ratingColor: string;
};

const dayEntries: DayEntry[] = [
    { time: '08:00', icon: 'sunny-outline',condition: 'Sonnig, 17°C',   rating: 'Ideal',ratingColor: '#185FA5' },
    { time: '11:00', icon: 'cloud-outline',condition: 'Bewölkt, 16°C', rating: 'Gut',ratingColor: '#1D9E75' },
    { time: '14:00', icon: 'rainy-outline',condition: 'Regen, 14°C',   rating: 'Mäßig',ratingColor: '#854F0B' },
    { time: '17:00', icon: 'thunderstorm-outline', condition: 'Gewitter, 12°C',rating: 'Nicht tauchen',ratingColor: '#A32D2D' },
];

export default function WetterScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>Wetter</Text>
                </View>
                <View style={styles.locationLine}>
                    <Ionicons name="location-outline" size={13} color="#B5D4F4" />
                    <Text style={styles.locationLineText}>Attersee, AT · Heute</Text>
                </View>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* WETTER-GRID */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Aktuelle Bedingungen</Text>
                    <View style={styles.weatherGrid}>
                        <View style={styles.weatherCard}>
                            <Text style={styles.weatherCardLabel}>Lufttemperatur</Text>
                            <Text style={styles.weatherCardValue}>
                                17<Text style={styles.weatherCardUnit}>°C</Text>
                            </Text>
                        </View>
                        <View style={styles.weatherCard}>
                            <Text style={styles.weatherCardLabel}>Wassertemperatur</Text>
                            <Text style={styles.weatherCardValue}>
                                11<Text style={styles.weatherCardUnit}>°C</Text>
                            </Text>
                        </View>
                        <View style={styles.weatherCard}>
                            <Text style={styles.weatherCardLabel}>Wind</Text>
                            <Text style={styles.weatherCardValue}>
                                12<Text style={styles.weatherCardUnit}>km/h</Text>
                            </Text>
                        </View>
                        <View style={styles.weatherCard}>
                            <Text style={styles.weatherCardLabel}>Wellenhöhe</Text>
                            <Text style={styles.weatherCardValue}>
                                0.3<Text style={styles.weatherCardUnit}>m</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                {/* TAUGLICHKEIT */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Tauglichkeit</Text>
                    <View style={styles.conditionsRow}>
                        <View style={[styles.pill, styles.pillGreen]}>
                            <Ionicons name="checkmark" size={13} color="#085041" />
                            <Text style={styles.pillTextGreen}>Wind: Optimal</Text>
                        </View>
                        <View style={[styles.pill, styles.pillGreen]}>
                            <Ionicons name="checkmark" size={13} color="#085041" />
                            <Text style={styles.pillTextGreen}>Sicht: Gut</Text>
                        </View>
                        <View style={[styles.pill, styles.pillAmber]}>
                            <Ionicons name="warning-outline" size={13} color="#633806" />
                            <Text style={styles.pillTextAmber}>Wasser: Kalt</Text>
                        </View>
                        <View style={[styles.pill, styles.pillGreen]}>
                            <Ionicons name="checkmark" size={13} color="#085041" />
                            <Text style={styles.pillTextGreen}>Wellen: Ruhig</Text>
                        </View>
                    </View>
                </View>

                {/* TAGESÜBERSICHT */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Tagesübersicht</Text>
                    {dayEntries.map((entry) => (
                        <View key={entry.time} style={styles.dayRow}>
                            <Text style={styles.dayTime}>{entry.time}</Text>
                            <View style={styles.dayCondition}>
                                <Ionicons name={entry.icon} size={16} color="#444" />
                                <Text style={styles.dayConditionText}>{entry.condition}</Text>
                            </View>
                            <Text style={{ fontSize: 13, fontWeight: '500', color: entry.ratingColor }}>
                                {entry.rating}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* OFFLINE BANNER */}
                <View style={styles.section}>
                    <View style={styles.offlineBanner}>
                        <Ionicons name="wifi" size={18} color="#633806" />
                        <Text style={styles.offlineBannerText}>
                            Offline-Modus: Wetterdaten werden nur mit aktiver Internetverbindung aktualisiert.
                            Alle anderen Funktionen sind vollständig verfügbar.
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}