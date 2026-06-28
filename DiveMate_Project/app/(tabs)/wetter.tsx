// app/(tabs)/wetter.tsx  ← ZWEITE Ansicht, bekommt lakeId als URL-Parameter
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {router, useLocalSearchParams, useRouter} from 'expo-router';
import { LAKES, Lake, getCurrentTemp } from '../../constants/lakes';
import { styles } from './styles/wetterStyles';

// ─── Typen ───────────────────────────────────────────────────────────────────

type WeatherData = {
    airTemp: number;
    waterTemp: number;
    windSpeed: number;
    maxDepth: number;
    dayEntries: DayEntry[];
};

type DayEntry = {
    time: string;
    icon: keyof typeof Ionicons.glyphMap;
    condition: string;
    rating: string;
    ratingColor: string;
};

// ─── Hilfsfunktionen ─────────────────────────────────────────────────────────

function getValueAtHour(times: string[], values: number[], targetHour: number): number {
    const idx = times.findIndex((t) => new Date(t).getHours() === targetHour);
    return idx !== -1 ? Math.round(values[idx] * 10) / 10 : 0;
}

function getDivingRating(airTemp: number, windSpeed: number): { rating: string; ratingColor: string } {
    if (windSpeed > 30) return { rating: 'Nicht tauchen', ratingColor: '#A32D2D' };
    if (windSpeed > 20) return { rating: 'Mäßig',         ratingColor: '#854F0B' };
    if (airTemp < 8)    return { rating: 'Mäßig',         ratingColor: '#854F0B' };
    if (airTemp < 14)   return { rating: 'Gut',            ratingColor: '#1D9E75' };
    return                     { rating: 'Ideal',           ratingColor: '#185FA5' };
}

function getWeatherIcon(windSpeed: number, airTemp: number): keyof typeof Ionicons.glyphMap {
    if (windSpeed > 30) return 'thunderstorm-outline';
    if (windSpeed > 20) return 'rainy-outline';
    if (airTemp < 5)    return 'snow-outline';
    if (airTemp < 14)   return 'cloud-outline';
    return 'sunny-outline';
}

// ─── Pill-Tauglichkeit ────────────────────────────────────────────────────────

type PillStatus = 'green' | 'amber' | 'red';

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

// ─── Haupt-Komponente ─────────────────────────────────────────────────────────

export default function WetterScreen() {
    const router = useRouter();
    const { lakeId } = useLocalSearchParams<{ lakeId: string }>();

    const lake: Lake | undefined = LAKES.find((l) => l.id === lakeId);

    const [weather, setWeather]   = useState<WeatherData | null>(null);
    const [loading, setLoading]   = useState(true);
    const [offline, setOffline]   = useState(false);

    const loadWeather = async () => {
        if (!lake) return;
        setLoading(true);
        setOffline(false);

        try {
            // Wetterdaten für die exakten See-Koordinaten laden
            const forecastUrl =
                `https://api.open-meteo.com/v1/forecast` +
                `?latitude=${lake.lat}&longitude=${lake.lng}` +
                `&hourly=temperature_2m,wind_speed_10m` +
                `&wind_speed_unit=kmh` +
                `&timezone=auto` +
                `&forecast_days=1`;

            const res = await fetch(forecastUrl);
            if (!res.ok) throw new Error('API-Fehler');
            const forecast = await res.json();

            const times    = forecast.hourly.time as string[];
            const airTemps = forecast.hourly.temperature_2m as number[];
            const winds    = forecast.hourly.wind_speed_10m as number[];

            const currentHour = new Date().getHours();
            const airTemp     = getValueAtHour(times, airTemps, currentHour);
            const windSpeed   = getValueAtHour(times, winds,    currentHour);

            // Wassertemperatur kommt aus lakes.ts (Monatswert)
            const waterTemp = getCurrentTemp(lake);

            // Tagesübersicht 08 / 11 / 14 / 17 Uhr
            const dayEntries: DayEntry[] = [8, 11, 14, 17].map((hour) => {
                const temp = getValueAtHour(times, airTemps, hour);
                const wind = getValueAtHour(times, winds,    hour);
                const { rating, ratingColor } = getDivingRating(temp, wind);
                return {
                    time: `${String(hour).padStart(2, '0')}:00`,
                    icon: getWeatherIcon(wind, temp),
                    condition: `${temp}°C · Wind ${wind} km/h`,
                    rating,
                    ratingColor,
                };
            });

            setWeather({ airTemp, waterTemp, windSpeed, maxDepth: lake.maxDepth, dayEntries });
        } catch {
            setOffline(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadWeather(); }, [lakeId]);

    // ─── See nicht gefunden ──────────────────────────────────────────────────
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

    // ─── Ladezustand ────────────────────────────────────────────────────────
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
                        Wetterdaten werden geladen …
                    </Text>
                </View>
            </View>
        );
    }

    // ─── Offline ─────────────────────────────────────────────────────────────
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
                        <View style={styles.offlineBanner}>
                            <Ionicons name="wifi" size={18} color="#633806" />
                            <Text style={styles.offlineBannerText}>
                                Offline-Modus: Wetterdaten werden nur mit aktiver Internetverbindung
                                aktualisiert. Alle anderen Funktionen sind vollständig verfügbar.
                            </Text>
                        </View>
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

    // ─── Pills ───────────────────────────────────────────────────────────────
    const windStatus  = getPillStatus(weather.windSpeed, 'wind');
    const waterStatus = getPillStatus(weather.waterTemp, 'water');
    const windPill    = pillStyle(windStatus);
    const waterPill   = pillStyle(waterStatus);

    // ─── UI ──────────────────────────────────────────────────────────────────
    return (
        <View style={styles.safeArea}>

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{lake.name}</Text>
                    <TouchableOpacity onPress={loadWeather}>
                        <Ionicons name="refresh-outline" size={20} color="#B5D4F4" />
                    </TouchableOpacity>
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

                {/* TAUGLICHKEIT */}
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

                {/* TAGESÜBERSICHT */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Tagesübersicht</Text>
                    {weather.dayEntries.map((entry) => (
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
                            Offline-Modus: Wetterdaten werden nur mit aktiver Internetverbindung
                            aktualisiert. Alle anderen Funktionen sind vollständig verfügbar.
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}