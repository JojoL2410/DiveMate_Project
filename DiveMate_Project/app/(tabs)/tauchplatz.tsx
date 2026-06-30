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


    // Lädt beim Öffnen der Seite alle Tauchplätze aus Firebase
    useEffect(() => {
        const loadLakesFromFirebase = async () => {
            // Holt alle Dokumente aus der Collection "lakes"
            const snapshot = await getDocs(collection(db, 'lakes'));

            // Wandelt die Firebase-Dokumente in Lake-Objekte um
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

            // Speichert die geladenen Seen im State
            setLakes(firebaseLakes);
        };

        loadLakesFromFirebase();
    }, []);

    // Öffnet die Wetterseite des ausgewählten Sees
    function goToWetter(lake: Lake) {
        router.push(`/wetter?lakeId=${lake.id}`);
    }

    // Sucht per GPS den nächstgelegenen Tauchsee
    async function handleGps() {
        // Startet den Ladezustand und entfernt alte Fehlermeldungen
        setGpsLoading(true);
        setGpsError(null);

        try {
            // Fragt die Standortberechtigung ab
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setGpsError('GPS-Berechtigung verweigert. Bitte in den Einstellungen freigeben.');
                return;
            }

            // Holt den aktuellen Standort
            const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { latitude, longitude } = loc.coords;

            // Prüft, ob Seen geladen wurden
            if (lakes.length === 0) {
                setGpsError('Es wurden keine Tauchplätze aus Firebase geladen.');
                return;
            }

            // Speichert den nächstgelegenen See und dessen Entfernung
            let nearest: Lake | null = null;
            let minDistance = Infinity;

            // Vergleicht die Entfernung zu jedem See
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

            // Nur Seen innerhalb von 20 km werden berücksichtigt
            if (minDistance > 20000) {
                nearest = null;
            }

            // Öffnet die Wetterseite oder zeigt eine Fehlermeldung
            if (nearest) {
                goToWetter(nearest);
            } else {
                setGpsError('Kein bekannter Tauchsee in der Nähe (Radius: 20 km).');
            }
        } catch {
            // Fehler beim Abrufen des Standorts
            setGpsError('GPS-Fehler. Bitte versuche es erneut.');
        } finally {
            // Beendet den Ladezustand
            setGpsLoading(false);
        }
    }

    return (
        <View style={styles.safeArea}>

            {/* Kopfbereich der Seite mit Titel, Profil-Icon und kurzer Beschreibung */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>Tauchplatz wählen</Text>
                    <Ionicons name="person-circle-outline" size={28} color="rgba(255,255,255,0.7)" />
                </View>
                <Text style={styles.headerSubtitle}>Wähle einen See oder nutze GPS</Text>
            </View>

            {/* Scrollbarer Bereich für die Liste der Tauchplätze */}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Top Tauchplätze</Text>

                    {/* Durchläuft alle geladenen Seen und erstellt für jeden See eine eigene Zeile */}
                    {lakes.map((lake) => (
                        <TouchableOpacity
                            key={lake.id}
                            style={styles.lakeRow}
                            onPress={() => goToWetter(lake)}
                            activeOpacity={0.7}
                        >
                            {/* Icon links neben dem Seenamen */}
                            <View style={styles.lakeIcon}>
                                <Ionicons name="pin-outline" size={20} color="#185FA5" />
                            </View>

                            {/* Zeigt Name und maximale Tiefe des Sees */}
                            <View style={styles.lakeInfo}>
                                <Text style={styles.lakeName}>{lake.name}</Text>
                                <Text style={styles.lakeDepth}>Max. Tiefe: {lake.maxDepth} m</Text>
                            </View>

                            {/* Pfeil zeigt, dass man zur Detail-/Wetterseite weitergehen kann */}
                            <Ionicons name="chevron-forward-outline" size={18} color="#aaa" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* GPS-Bereich mit Fehlermeldung und Button */}
            <View style={styles.gpsContainer}>
                {/* Fehlermeldung wird nur angezeigt, wenn gpsError einen Text enthält */}
                {gpsError && <Text style={styles.gpsError}>{gpsError}</Text>}

                <TouchableOpacity
                    style={styles.gpsButton}
                    onPress={handleGps}
                    disabled={gpsLoading}
                    activeOpacity={0.8}
                >
                    {/* Während GPS lädt, wird ein Ladezeichen angezeigt, sonst ein Standort-Icon */}
                    {gpsLoading
                        ? <ActivityIndicator color="#fff" size="small" />
                        : <Ionicons name="locate-outline" size={20} color="#fff" />
                    }

                    {/* Button-Text ändert sich je nachdem, ob GPS gerade lädt */}
                    <Text style={styles.gpsButtonText}>
                        {gpsLoading ? 'Standort wird ermittelt …' : 'Mit GPS nächsten See finden'}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
