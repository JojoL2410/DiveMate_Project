// app/(tabs)/wetter.tsx
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {router, useLocalSearchParams, useRouter} from 'expo-router';
import { Lake, getCurrentTemp } from '../../constants/lakes';
import { styles } from './styles/wetterStyles';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


// Beschreibt Wetterdaten, die auf Seite angezeigt werden
type WeatherData = {
    airTemp: number;
    waterTemp: number;
    windSpeed: number;
    maxDepth: number;
    dayEntries: DayEntry[];
};

// Beschreibt Eintrag in Tagesübersicht, z.B. 08:00
type DayEntry = {
    time: string;
    icon: keyof typeof Ionicons.glyphMap;
    condition: string;
};

// Hilfsfunktionen
// Sucht aus Wetterdaten Wert für bestimmte Uhrzeit
function getValueAtHour(times: string[], values: number[], targetHour: number): number {
    const idx = times.findIndex((t) => new Date(t).getHours() === targetHour);
    return idx !== -1 ? Math.round(values[idx] * 10) / 10 : 0;
}

// Wählt passend zu Wind und Temperatur ein Wetter-Icon aus
function getWeatherIcon(windSpeed: number, airTemp: number): keyof typeof Ionicons.glyphMap {
    if (windSpeed > 30) return 'thunderstorm-outline';
    if (windSpeed > 20) return 'rainy-outline';
    if (airTemp < 5)    return 'snow-outline';
    if (airTemp < 14)   return 'cloud-outline';
    return 'sunny-outline';
}

//Pill-Tauglichkeit
type PillStatus = 'green' | 'amber' | 'red';

// Bewertet Wind/Wassertemperatur für farbigen Status
function getPillStatus(value: number, type: 'wind' | 'water'): PillStatus {
    if (type === 'wind') {
        if (value <= 15) return 'green';
        if (value <= 25) return 'amber';
        return 'red';
    }
    if (value >= 18) return 'green';
    if (value >= 12) return 'amber';
    return 'red';
}

function pillStyle(status: PillStatus) {
    if (status === 'green') return { bg: styles.pillGreen, text: styles.pillTextGreen, iconColor: '#085041' };
    if (status === 'amber') return { bg: styles.pillAmber, text: styles.pillTextAmber, iconColor: '#633806' };
    return { bg: styles.pillRed, text: styles.pillTextRed, iconColor: '#7B1515' };
}

function pillIcon(status: PillStatus): keyof typeof Ionicons.glyphMap {
    if (status === 'green') return 'checkmark';
    if (status === 'amber') return 'warning-outline';
    return 'close-circle-outline';
}

// Wetterseite für den ausgewählten See

export default function WetterScreen() {
    const router = useRouter();
    // Holt lakeId aus URL, z.B. /wetter?lakeId=attersee
    const { lakeId } = useLocalSearchParams<{ lakeId: string }>();
    // Speichert den aktuell ausgewählten See aus Firebase
    const [lake, setLake] = useState<Lake | null>(null);
    // Zeigt an, ob See aus Firebase geladen wird
    const [lakeLoading, setLakeLoading] = useState(true);

    // Speichert geladene Wetterdaten
    const [weather, setWeather]   = useState<WeatherData | null>(null);
    // Zeigt, ob Wetterdaten geladen
    const [loading, setLoading]   = useState(true);
    // Wird true, wenn Wetterdaten nicht geladen werden
    const [offline, setOffline]   = useState(false);

    // Lädt Wetterdaten von Open-Meteo API
    const loadWeather = async () => {
        if (!lake) return; //Kein See gefunden
        // Startet Ladezustand & setzt vorherige Fehler zurück
        setLoading(true);
        setOffline(false);

        try {
            // Wetterdaten für die exakten See-Koordinaten laden
            const forecastUrl =
                `https://api.open-meteo.com/v1/forecast` +
                `?latitude=${lake.lat}&longitude=${lake.lng}`+
                `&hourly=temperature_2m,wind_speed_10m` +
                `&wind_speed_unit=kmh` +
                `&timezone=auto` +
                `&forecast_days=1`;

            // Sendet Anfrage an die Open-Meteo API
            const res = await fetch(forecastUrl);
            if (!res.ok) throw new Error('API-Fehler');
            // Liest Antwort der API als JSON-Daten aus
            const forecast = await res.json();

            // Holt die Listen für Uhrzeiten, Lufttemperaturen & Windgeschwindigkeiten
            const times    = forecast.hourly.time as string[];
            const airTemps = forecast.hourly.temperature_2m as number[];
            const winds    = forecast.hourly.wind_speed_10m as number[];

            // Holt Werte für aktuelle Stunde
            const currentHour = new Date().getHours();
            const airTemp     = getValueAtHour(times, airTemps, currentHour);
            const windSpeed   = getValueAtHour(times, winds,    currentHour);

            // Wassertemperatur kommt aus lakes.ts (Monatswert)
            const waterTemp = getCurrentTemp(lake);

            // Tagesübersicht 08 / 11 / 14 / 17 Uhr
            const dayEntries: DayEntry[] = [8, 11, 14, 17].map((hour) => {
                const temp = getValueAtHour(times, airTemps, hour);
                const wind = getValueAtHour(times, winds,    hour);
                return {
                    time: `${String(hour).padStart(2, '0')}:00`,
                    icon: getWeatherIcon(wind, temp),
                    condition: `${temp}°C · Wind ${wind} km/h`,
                };
            });

            // Speichert alle Werte, damit sie angezeigt werden können
            setWeather({ airTemp, waterTemp, windSpeed, maxDepth: lake.maxDepth, dayEntries });
        } catch {
            // Wenn etwas schiefgeht->Offline-Zustand
            setOffline(true);
        } finally {
            // Beendet Ladezustand ->egal ob erfolgreich oder fehlerhaft
            setLoading(false);
        }
    };
    // Lädt ausgewählten See aus Firebase, sobald sich lakeId ändert
    useEffect(() => {
        // Setzt den Ladezustand & entfernt alte Wetterdaten
        setLakeLoading(true);
        setWeather(null);
        setOffline(false);

        const loadLakeFromFirebase = async () => {
            if (!lakeId) return;

            // Holt "lakes"-Dokument aus Firebase
            const lakeDocument = await getDoc(doc(db, 'lakes', lakeId));
            const data = lakeDocument.data();

            // Falls See nicht existiert -> kein See gesetzt
            if (!lakeDocument.exists() || !data) {
                setLake(null);
                setLakeLoading(false);
                return;
            }

            // Wandelt Firebase-Daten in Lake-Objekt um
            setLake({
                id: lakeDocument.id,
                name: String(data.name ?? ''),
                lat: Number(data.lat ?? 0),
                lng: Number(data.lng ?? 0),
                maxDepth: Number(data.maxDepth ?? 0),
                monthlyTemps: data.monthlyTemps ?? {},
            });

            // See -> fertig geladen
            setLakeLoading(false);
        };

        loadLakeFromFirebase();
    }, [lakeId]);

    // Sobald See geladen wurde, werden Wetterdaten abgefragt
    useEffect(() => {
        if (lake) {
            loadWeather();
        }
    }, [lake]);

    // See aus Firebase geladen -> erscheint ein Ladeindikator
    if (lakeLoading) {
        return (
            <View style={styles.safeArea}>
                <ActivityIndicator size="large" color="#185FA5" />
            </View>
        );
    }

    // See nicht gefunden ->Fehlermeldung
    if (!lake) {
        return (
            <View style={styles.safeArea}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                    <Text style={{ color: '#A32D2D', fontSize: 14 }}>See nicht gefunden.</Text>
                    <TouchableOpacity onPress={() => router.push('./tauchplatz')} style={{ marginTop: 16 }}>
                        <Text style={{ color: '#185FA5', fontWeight: '600' }}>Zurück zur Auswahl</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    //Ladeanzeige: Weterdaten werden geladen
    if (loading) {
        return (
            <View style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => router.push('./tauchplatz')}>
                            <Ionicons name="arrow-back-outline" size={22} color="#B5D4F4" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{lake.name}</Text>
                        <View style={{ width: 22 }} />
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#185FA5" />
                    <Text style={{ marginTop: 12, color: '#888', fontSize: 14 }}>
                        Wetterdaten werden geladen ...
                    </Text>
                </View>
            </View>
        );
    }

    // Keine Wetterdaten geladen ->  Fehler
    if (offline || !weather) {
        return (
            <View style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => router.push('./tauchplatz')}>
                            <Ionicons name="arrow-back-outline" size={22} color="#B5D4F4" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{lake.name}</Text>
                        <View style={{ width: 22 }} />
                    </View>
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.section}>
                        <Text style={{ color: '#A32D2D', fontSize: 14, marginBottom: 12 }}>
                            Wetterdaten konnten nicht geladen werden. Bitte prüfe deine Internetverbindung.
                        </Text>

                        {/* Button, um die Wetterdaten erneut zu laden */}
                        <TouchableOpacity
                            onPress={loadWeather}
                            style={{ marginTop: 12, backgroundColor: '#185FA5', borderRadius: 10, padding: 12, alignItems: 'center' }}
                        >
                            <Text style={{ color: '#fff', fontWeight: '600' }}>Erneut versuchen</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    // Pills
    // Bewertet Wind & Wassertemperatur für farbige Statusanzeige
    const windStatus  = getPillStatus(weather.windSpeed, 'wind');
    const waterStatus = getPillStatus(weather.waterTemp, 'water');
    // Holt passende Farben & Textstyles für Statusanzeige
    const windPill    = pillStyle(windStatus);
    const waterPill   = pillStyle(waterStatus);

    // Anzeige Wetterseite
    return (
        <View style={styles.safeArea}>

            {/* Kopfbereich mit Zurück-Button, See-Name und Aktualisieren-Button */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.push('./tauchplatz')}>
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{lake.name}</Text>
                    <TouchableOpacity onPress={loadWeather}>
                        <Ionicons name="refresh-outline" size={20} color="#B5D4F4" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* Anzeige aktuelle Bedingungen: Lufttemperatur, Wasser, Wind & max. Tiefe */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Aktuelle Bedingungen</Text>
                    <View style={styles.weatherGrid}>
                        <View style={styles.weatherCard}>
                            <Text style={styles.weatherCardLabel}>Lufttemperatur</Text>
                            <Text style={styles.weatherCardValue}>
                                {weather.airTemp}<Text style={styles.weatherCardUnit}>°C</Text>
                            </Text>
                        </View>
                        <View style={styles.weatherCard}>
                            <Text style={styles.weatherCardLabel}>⌀ Wassertemperatur</Text>
                            <Text style={styles.weatherCardValue}>
                                {weather.waterTemp}<Text style={styles.weatherCardUnit}>°C</Text>
                            </Text>
                        </View>
                        <View style={styles.weatherCard}>
                            <Text style={styles.weatherCardLabel}>Wind</Text>
                            <Text style={styles.weatherCardValue}>
                                {weather.windSpeed}<Text style={styles.weatherCardUnit}> km/h</Text>
                            </Text>
                        </View>
                        <View style={styles.weatherCard}>
                            <Text style={styles.weatherCardLabel}>Max. Tiefe</Text>
                            <Text style={styles.weatherCardValue}>
                                {weather.maxDepth}<Text style={styles.weatherCardUnit}> m</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Farbliche Bewertung der Tauchbedingungen */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Tauglichkeit</Text>
                    <View style={styles.conditionsRow}>
                        <View style={[styles.pill, windPill.bg]}>
                            <Ionicons name={pillIcon(windStatus)} size={13} color={windPill.iconColor} />
                            <Text style={windPill.text}>
                                Wind: {windStatus === 'green' ? 'Optimal' : windStatus === 'amber' ? 'Mäßig' : 'Stark'}
                            </Text>
                        </View>
                        <View style={[styles.pill, waterPill.bg]}>
                            <Ionicons name={pillIcon(waterStatus)} size={13} color={waterPill.iconColor} />
                            <Text style={waterPill.text}>
                                Wasser: {waterStatus === 'green' ? 'Warm' : waterStatus === 'amber' ? 'Kalt' : 'Sehr kalt'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Tagesübersicht für mehrere Uhrzeiten */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Tagesübersicht</Text>
                    {weather.dayEntries.map((entry) => (
                        <View key={entry.time} style={styles.dayRow}>
                            <Text style={styles.dayTime}>{entry.time}</Text>
                            <View style={styles.dayCondition}>
                                <Ionicons name={entry.icon} size={16} color="#444" />
                                <Text style={styles.dayConditionText}>{entry.condition}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}