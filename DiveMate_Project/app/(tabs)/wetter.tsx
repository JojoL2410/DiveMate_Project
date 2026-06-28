// app/(tabs)/wetter.tsx
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { getCurrentTemp } from '../../constants/lakes';
import { styles } from './styles/wetterStyles';

// ─── Typen ───────────────────────────────────────────────────────────────────

type WeatherData = {
    airTemp: number;        // Lufttemperatur in °C (aktuell)
    waterTemp: number;      // Wassertemperatur in °C (aktuell)
    windSpeed: number;      // Wind in km/h (aktuell)
    waveHeight: number;     // Wellenhöhe in m (aktuell)
    locationName: string;   // Ortsname (per Reverse Geocoding)
    dayEntries: DayEntry[]; // Tagesübersicht 08/11/14/17 Uhr
};

type DayEntry = {
    time: string;
    icon: keyof typeof Ionicons.glyphMap;
    condition: string;
    rating: string;
    ratingColor: string;
};

// ─── Hilfsfunktionen ─────────────────────────────────────────────────────────

/** Gibt den Wert aus einem stündlichen Array für eine bestimmte Stunde zurück */
function getValueAtHour(times: string[], values: number[], targetHour: number): number {
    const idx = times.findIndex((t) => new Date(t).getHours() === targetHour);
    return idx !== -1 ? Math.round(values[idx] * 10) / 10 : 0;
}

/** Bewertet die Tauchtauglichkeit anhand von Temperatur und Wind */
function getDivingRating(airTemp: number, windSpeed: number): { rating: string; ratingColor: string } {
    if (windSpeed > 30)   return { rating: 'Nicht tauchen', ratingColor: '#A32D2D' };
    if (windSpeed > 20)   return { rating: 'Mäßig',        ratingColor: '#854F0B' };
    if (airTemp < 8)      return { rating: 'Mäßig',        ratingColor: '#854F0B' };
    if (airTemp < 14)     return { rating: 'Gut',           ratingColor: '#1D9E75' };
    return                       { rating: 'Ideal',          ratingColor: '#185FA5' };
}

/** Wählt ein passendes Ionicons-Icon für einen Wind-/Temp-Wert */
function getWeatherIcon(windSpeed: number, airTemp: number): keyof typeof Ionicons.glyphMap {
    if (windSpeed > 30) return 'thunderstorm-outline';
    if (windSpeed > 20) return 'rainy-outline';
    if (airTemp < 5)    return 'snow-outline';
    if (airTemp < 14)   return 'cloud-outline';
    return 'sunny-outline';
}

/** Einfaches Reverse-Geocoding über Open-Meteo Geocoding (nur online) */
async function reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
        // Expo Location bietet direkt eine reverseGeocodeAsync-Funktion
        const result = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
        if (result.length > 0) {
            const r = result[0];
            return [r.city || r.district || r.subregion, r.country].filter(Boolean).join(', ');
        }
    } catch (_) {}
    return `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
}

// ─── Pill-Tauglichkeit ────────────────────────────────────────────────────────

type PillStatus = 'green' | 'amber' | 'red';

function getPillStatus(value: number, type: 'wind' | 'wave' | 'water'): PillStatus {
    if (type === 'wind') {
        if (value <= 15) return 'green';
        if (value <= 25) return 'amber';
        return 'red';
    }
    if (type === 'wave') {
        if (value <= 0.3) return 'green';
        if (value <= 0.8) return 'amber';
        return 'red';
    }
    // water temp
    if (value >= 18) return 'green';
    if (value >= 12) return 'amber';
    return 'red';
}

function pillStyle(status: PillStatus) {
    if (status === 'green') return { bg: styles.pillGreen, text: styles.pillTextGreen, iconColor: '#085041' };
    if (status === 'amber') return { bg: styles.pillAmber, text: styles.pillTextAmber, iconColor: '#633806' };
    return { bg: styles.pillRed,   text: styles.pillTextRed,   iconColor: '#7B1515' };
}

function pillIcon(status: PillStatus): keyof typeof Ionicons.glyphMap {
    if (status === 'green') return 'checkmark';
    if (status === 'amber') return 'warning-outline';
    return 'close-circle-outline';
}

// ─── Haupt-Komponente ─────────────────────────────────────────────────────────

export default function WetterScreen() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [offline, setOffline] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadWeather = async () => {
        setLoading(true);
        setError(null);
        setOffline(false);

        try {
            // 1️⃣ GPS-Koordinaten holen
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('GPS-Berechtigung verweigert. Bitte in den Einstellungen freigeben.');
                setLoading(false);
                return;
            }
            const loc = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced});
            const {latitude, longitude} = loc.coords;

            // 2️⃣ Ortsname holen
            const locationName = await reverseGeocode(latitude, longitude);

            // 3️⃣ Open-Meteo Forecast API – Lufttemperatur & Wind (stündlich)
            const forecastUrl =
                `https://api.open-meteo.com/v1/forecast` +
                `?latitude=${latitude}&longitude=${longitude}` +
                `&hourly=temperature_2m,wind_speed_10m` +
                `&wind_speed_unit=kmh` +
                `&timezone=auto` +
                `&forecast_days=1`;

            // 4️⃣ Open-Meteo Marine API – Wassertemperatur & Wellenhöhe (stündlich)
            const marineUrl =
                `https://marine-api.open-meteo.com/v1/marine` +
                `?latitude=${latitude}&longitude=${longitude}` +
                `&hourly=wave_height,sea_surface_temperature` +
                `&timezone=auto` +
                `&forecast_days=1`;

            const [forecastRes, marineRes] = await Promise.all([
                fetch(forecastUrl),
                fetch(marineUrl),
            ]);

            if (!forecastRes.ok || !marineRes.ok) {
                throw new Error('API-Fehler');
            }

            const forecast = await forecastRes.json();
            const marine = await marineRes.json();

            const times = forecast.hourly.time as string[];
            const airTemps = forecast.hourly.temperature_2m as number[];
            const winds = forecast.hourly.wind_speed_10m as number[];
            const waves = marine.hourly.wave_height as number[];
            const waterTemps = marine.hourly.sea_surface_temperature as number[];

            // 5️⃣ Aktueller Wert = aktuelle Stunde
            const currentHour = new Date().getHours();
            const airTemp = getValueAtHour(times, airTemps, currentHour);
            const windSpeed = getValueAtHour(times, winds, currentHour);
            const waveHeight = getValueAtHour(times, waves, currentHour);

            // Wassertemperatur: See in der Nähe → Seewert, sonst Marine API
            /* const nearestLake = getNearestLakeIfClose(latitude, longitude);
             const waterTemp   = nearestLake
                 ? getCurrentTemp(nearestLake)
                 : getValueAtHour(times, waterTemps, currentHour);
*/
             // 6️⃣ Tagesübersicht: 08, 11, 14, 17 Uhr
             const dayEntries: DayEntry[] = [8, 11, 14, 17].map((hour) => {
                 const temp  = getValueAtHour(times, airTemps, hour);
                 const wind  = getValueAtHour(times, winds,    hour);
                 const { rating, ratingColor } = getDivingRating(temp, wind);
                 const icon  = getWeatherIcon(wind, temp);
                 return {
                     time: `${String(hour).padStart(2, '0')}:00`,
                     icon,
                     condition: `${temp}°C · Wind ${wind} km/h`,
                     rating,
                     ratingColor,
                 };
             });

             setWeather({
                 locationName: "",
                 waterTemp: 0,
                 airTemp,
                 windSpeed,
                 waveHeight,
                 dayEntries
             });} catch (e) {
             // Netzwerkfehler → Offline-Modus
             setOffline(true);

        } finally {
            setLoading(false);
        }
        /*}; */

        useEffect(() => {
            loadWeather();
        }, []);

        // ─── Ladezustand ────────────────────────────────────────────────────────
        if (loading) {
            return (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <View style={styles.headerTop}>
                            <Text style={styles.headerTitle}>Wetter</Text>
                        </View>
                        <View style={styles.locationLine}>
                            <Ionicons name="location-outline" size={13} color="#B5D4F4"/>
                            <Text style={styles.locationLineText}>Standort wird ermittelt …</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#185FA5"/>
                        <Text style={{marginTop: 12, color: '#888', fontSize: 14}}>
                            Wetterdaten werden geladen …
                        </Text>
                    </View>
                </SafeAreaView>
            );
        }

        // ─── Offline-Modus ──────────────────────────────────────────────────────
        if (offline || !weather) {
            return (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <View style={styles.headerTop}>
                            <Text style={styles.headerTitle}>Wetter</Text>
                        </View>
                        <View style={styles.locationLine}>
                            <Ionicons name="wifi-outline" size={13} color="#B5D4F4"/>
                            <Text style={styles.locationLineText}>Offline</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.section}>
                            <View style={styles.offlineBanner}>
                                <Ionicons name="wifi" size={18} color="#633806"/>
                                <Text style={styles.offlineBannerText}>
                                    Offline-Modus: Wetterdaten werden nur mit aktiver Internetverbindung
                                    aktualisiert. Alle anderen Funktionen sind vollständig verfügbar.
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={loadWeather}
                                style={{
                                    marginTop: 12,
                                    backgroundColor: '#185FA5',
                                    borderRadius: 10,
                                    padding: 12,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{color: '#fff', fontWeight: '600'}}>Erneut versuchen</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }

        // ─── Fehler (z.B. GPS verweigert) ───────────────────────────────────────
        if (error) {
            return (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <View style={styles.headerTop}>
                            <Text style={styles.headerTitle}>Wetter</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24}}>
                        <Ionicons name="location-outline" size={40} color="#A32D2D"/>
                        <Text style={{marginTop: 12, color: '#A32D2D', fontSize: 14, textAlign: 'center'}}>
                            {error}
                        </Text>
                        <TouchableOpacity onPress={loadWeather} style={{marginTop: 16}}>
                            <Text style={{color: '#185FA5', fontWeight: '600'}}>Erneut versuchen</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            );
        }

        // ─── Tauglichkeits-Pills ─────────────────────────────────────────────────
        const windStatus = getPillStatus(weather.windSpeed, 'wind');
        const waveStatus = getPillStatus(weather.waveHeight, 'wave');
        const waterStatus = getPillStatus(weather.waterTemp, 'water');

        const windPill = pillStyle(windStatus);
        const wavePill = pillStyle(waveStatus);
        const waterPill = pillStyle(waterStatus);

        // ─── UI ──────────────────────────────────────────────────────────────────
        return (
            <SafeAreaView style={styles.safeArea}>

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <Text style={styles.headerTitle}>Wetter</Text>
                        <TouchableOpacity onPress={loadWeather}>
                            <Ionicons name="refresh-outline" size={20} color="#B5D4F4"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.locationLine}>
                        <Ionicons name="location-outline" size={13} color="#B5D4F4"/>
                        <Text style={styles.locationLineText}>{weather.locationName} · Heute</Text>
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
                                <Text style={styles.weatherCardLabel}>Wellenhöhe</Text>
                                <Text style={styles.weatherCardValue}>
                                    {weather.waveHeight}<Text style={styles.weatherCardUnit}> m</Text>
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* TAUGLICHKEIT */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Tauglichkeit</Text>
                        <View style={styles.conditionsRow}>

                            <View style={[styles.pill, windPill.bg]}>
                                <Ionicons name={pillIcon(windStatus)} size={13} color={windPill.iconColor}/>
                                <Text style={windPill.text}>
                                    Wind: {windStatus === 'green' ? 'Optimal' : windStatus === 'amber' ? 'Mäßig' : 'Stark'}
                                </Text>
                            </View>

                            <View style={[styles.pill, wavePill.bg]}>
                                <Ionicons name={pillIcon(waveStatus)} size={13} color={wavePill.iconColor}/>
                                <Text style={wavePill.text}>
                                    Wellen: {waveStatus === 'green' ? 'Ruhig' : waveStatus === 'amber' ? 'Mäßig' : 'Hoch'}
                                </Text>
                            </View>

                            <View style={[styles.pill, waterPill.bg]}>
                                <Ionicons name={pillIcon(waterStatus)} size={13} color={waterPill.iconColor}/>
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
                                    <Ionicons name={entry.icon} size={16} color="#444"/>
                                    <Text style={styles.dayConditionText}>{entry.condition}</Text>
                                </View>
                                <Text style={{fontSize: 13, fontWeight: '500', color: entry.ratingColor}}>
                                    {entry.rating}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* OFFLINE BANNER – nur als Info, nicht im Fehlerfall */}
                    <View style={styles.section}>
                        <View style={styles.offlineBanner}>
                            <Ionicons name="wifi" size={18} color="#633806"/>
                            <Text style={styles.offlineBannerText}>
                                Offline-Modus: Wetterdaten werden nur mit aktiver Internetverbindung
                                aktualisiert. Alle anderen Funktionen sind vollständig verfügbar.
                            </Text>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
}
