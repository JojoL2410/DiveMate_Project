// app/(tabs)/tauchplatz.tsx

import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Lake } from '../../constants/lakes';
import { styles } from './styles/tauchplatzStyles';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getDistance } from 'geolib';

export default function TauchplatzScreen() {
    const [lakes, setLakes] = useState<Lake[]>([]);
    const router = useRouter();
    const [gpsLoading, setGpsLoading] = useState(false);
    const [gpsError, setGpsError]     = useState<string | null>(null);

    useEffect(() => {
        const loadLakesFromFirebase = async () => {
            const snapshot = await getDocs(collection(db, 'lakes'));

            const firebaseLakes = snapshot.docs.map((document) => {
                const data = document.data();

                return {
                    id: document.id,
                    name: String(data.name ?? ''),
                    lat: Number(data.lat ?? 0),
                    lng: Number(data.lng ?? 0),
                    maxDepth: Number(data.maxDepth ?? 0),
                    monthlyTemps: data.monthlyTemps ?? {},
                };
            });

            setLakes(firebaseLakes);
        };

        loadLakesFromFirebase();
    }, []);

    function goToWetter(lake: Lake) {
        router.push(`/wetter?lakeId=${lake.id}`);
    }

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
            let nearest: Lake | null = null;
            let minDistance = Infinity;

            for (const lake of lakes) {
                const dist = getDistance(
                    { latitude, longitude },
                    { latitude: lake.lat, longitude: lake.lng }
                );

                if (dist < minDistance) {
                    minDistance = dist;
                    nearest = lake;
                }
            }

            if (minDistance > 20000) {
                nearest = null;
            }

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
                    <Ionicons name="person-circle-outline" size={28} color="rgba(255,255,255,0.7)" />
                </View>
                <Text style={styles.headerSubtitle}>Wähle einen See oder nutze GPS</Text>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Top Tauchplätze</Text>
                    {lakes.map((lake) => (
                        <TouchableOpacity
                            key={lake.id}
                            style={styles.lakeRow}
                            onPress={() => goToWetter(lake)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.lakeIcon}>
                                <Ionicons name="pin-outline" size={20} color="#185FA5" />
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

            <View style={styles.gpsContainer}>
                {gpsError && <Text style={styles.gpsError}>{gpsError}</Text>}
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