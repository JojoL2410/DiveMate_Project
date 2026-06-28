// app/(tabs)/wetter.tsx  ← das ist eure neue ERSTE Ansicht (Tauchplatz-Auswahl)
// Speichert den gewählten See und navigiert zur Wetterseite
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { LAKES, Lake, getNearestLakeIfClose } from '../../constants/lakes';
import { styles } from './styles/tauchplatzStyles';

export default function TauchplatzScreen() {
    const router = useRouter();
    const [gpsLoading, setGpsLoading] = useState(false);
    const [gpsError, setGpsError]     = useState<string | null>(null);

    /** Navigiert zur Wetterseite und übergibt die See-ID als URL-Parameter */
    function goToWetter(lake: Lake) {
        router.push(`/wetter?lakeId=${lake.id}`);
    }

    /** GPS: nächsten See suchen und direkt zur Wetterseite */
    async function handleGps() {
        setGpsLoading(true);
        setGpsError(null);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setGpsError('GPS-Berechtigung verweigert. Bitte in den Einstellungen freigeben.');
                return;
            }
            const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            const { latitude, longitude } = loc.coords;
            const nearest = getNearestLakeIfClose(latitude, longitude);
            if (nearest) {
                goToWetter(nearest);
            } else {
                setGpsError('Kein bekannter Tauchsee in der Nähe (Radius: 20 km).');
            }
        } catch {
            setGpsError('GPS-Fehler. Bitte versuche es erneut.');
        } finally {
            setGpsLoading(false);
        }
    }

    return (
        <View style={styles.safeArea}>

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>Tauchplatz wählen</Text>
                </View>
                <Text style={styles.headerSubtitle}>Wähle einen See oder nutze GPS</Text>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* SEEN-LISTE */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Top Tauchplätze</Text>
                    {LAKES.map((lake) => (
                        <TouchableOpacity
                            key={lake.id}
                            style={styles.lakeRow}
                            onPress={() => goToWetter(lake)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.lakeIcon}>
                                <Ionicons name="water-outline" size={20} color="#185FA5" />
                            </View>
                            <View style={styles.lakeInfo}>
                                <Text style={styles.lakeName}>{lake.name}</Text>
                                <Text style={styles.lakeDepth}>Max. Tiefe: {lake.maxDepth} m</Text>
                            </View>
                            <Ionicons name="chevron-forward-outline" size={18} color="#aaa" />
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>

            {/* GPS BUTTON – fixiert am unteren Rand */}
            <View style={styles.gpsContainer}>
                {gpsError && (
                    <Text style={styles.gpsError}>{gpsError}</Text>
                )}
                <TouchableOpacity
                    style={styles.gpsButton}
                    onPress={handleGps}
                    disabled={gpsLoading}
                    activeOpacity={0.8}
                >
                    {gpsLoading
                        ? <ActivityIndicator color="#fff" size="small" />
                        : <Ionicons name="locate-outline" size={20} color="#fff" />
                    }
                    <Text style={styles.gpsButtonText}>
                        {gpsLoading ? 'Standort wird ermittelt …' : 'Mit GPS nächsten See finden'}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}