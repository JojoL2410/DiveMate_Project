// app/(tabs)/index.tsx
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDives } from '../_layout';
import { styles } from '../(tabs)/styles/homeStyle';

export default function HomeScreen() {
    const { dives } = useDives();
    const lastDive = dives[0];

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.appTitle}>
                        Dive<Text style={styles.appTitleAccent}>Log</Text>
                    </Text>
                    <View style={styles.gpsBadge}>
                        <Ionicons name="location" size={12} color="#9FE1CB" />
                        <Text style={styles.gpsBadgeText}>Attersee, AT</Text>
                    </View>
                </View>
                <View style={styles.locationLine}>
                    <Ionicons name="calendar-outline" size={13} color="#B5D4F4" />
                    <Text style={styles.locationLineText}>Samstag, 17. Mai 2025</Text>
                </View>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* NÄCHSTER TAUCHGANG */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Nächster Tauchgang</Text>
                    <View style={styles.nextDiveCard}>
                        <View style={styles.nextDiveTop}>
                            <Text style={styles.nextDiveLocation}>Attersee Süd</Text>
                            <View style={styles.diveBadge}>
                                <Ionicons name="pricetag" size={11} color="#185FA5" />
                                <Text style={styles.diveBadgeText}>Freizeittauchen</Text>
                            </View>
                        </View>
                        <View style={styles.nextDiveRow}>
                            <Ionicons name="calendar-outline" size={14} color="#888" />
                            <Text style={styles.nextDiveInfo}>Sa, 17. Mai 2025 · 09:00 Uhr</Text>
                        </View>
                        <View style={styles.nextDiveRow}>
                            <Ionicons name="people-outline" size={14} color="#888" />
                            <Text style={styles.nextDiveInfo}>Buddy: Maria S.</Text>
                        </View>
                        <View style={styles.nextDiveRow}>
                            <Ionicons name="arrow-down-outline" size={14} color="#888" />
                            <Text style={styles.nextDiveInfo}>Zieltiefe: 20 m · ca. 50 min</Text>
                        </View>
                    </View>
                </View>

                {/* QUICK ACTIONS */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Schnellzugriff</Text>
                    <View style={styles.quickGrid}>

                        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/wetter')}>
                            <View style={[styles.quickIcon, styles.quickIconBlue]}>
                                <Ionicons name="cloud-outline" size={22} color="#185FA5" />
                            </View>
                            <Text style={styles.quickLabel}>Wetter</Text>
                            <Text style={styles.quickSub}>Gut · 17°C</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/ausruestung')}>
                            <View style={[styles.quickIcon, styles.quickIconTeal]}>
                                <MaterialCommunityIcons name="bag-personal-outline" size={22} color="#1D9E75" />
                            </View>
                            <Text style={styles.quickLabel}>Ausrüstung</Text>
                            <Text style={styles.quickSub}>3 / 9 gecheckt</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/buddy')}>
                            <View style={[styles.quickIcon, styles.quickIconPurple]}>
                                <Ionicons name="people-outline" size={22} color="#6D28D9" />
                            </View>
                            <Text style={styles.quickLabel}>Buddy</Text>
                            <Text style={styles.quickSub}>0 / 5 Schritte</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/logbuch')}>
                            <View style={[styles.quickIcon, styles.quickIconAmber]}>
                                <Ionicons name="book-outline" size={22} color="#EF9F27" />
                            </View>
                            <Text style={styles.quickLabel}>Logbuch</Text>
                            <Text style={styles.quickSub}>{dives.length} Tauchgänge</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* LETZTER TAUCHGANG */}
                {lastDive && (
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Zuletzt getaucht</Text>
                        <View style={styles.lastDiveCard}>
                            <View style={styles.lastDiveLeft}>
                                <Text style={styles.lastDiveLocation}>{lastDive.location}</Text>
                                <Text style={styles.lastDiveDate}>{lastDive.date}</Text>
                            </View>
                            <View style={styles.lastDiveStats}>
                                <View style={styles.lastDiveStat}>
                                    <Ionicons name="arrow-down-outline" size={13} color="#185FA5" />
                                    <Text style={styles.lastDiveStatText}>{lastDive.depth} m</Text>
                                </View>
                                <View style={styles.lastDiveStat}>
                                    <Ionicons name="time-outline" size={13} color="#185FA5" />
                                    <Text style={styles.lastDiveStatText}>{lastDive.duration} min</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}