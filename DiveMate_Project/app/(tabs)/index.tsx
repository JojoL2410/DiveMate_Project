import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDives } from '../_layout';
import { styles } from '../(tabs)/styles/homeStyle';

export default function HomeScreen() {
    const { dives } = useDives();
    const lastDive = dives[0];

    return (
        <View style={styles.safeArea}>

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.appTitle}>
                        Dive<Text style={styles.appTitleAccent}>Mate</Text>
                    </Text>
                </View>
                <View style={styles.locationLine}>
                    <Ionicons name="calendar-outline" size={13} color="#B5D4F4" />
                    <Text style={styles.locationLineText}>
                        {new Date().toLocaleDateString('de-AT', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </Text>
                </View>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* QUICK ACTIONS */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Schnellzugriff</Text>
                    <View style={styles.quickGrid}>

                        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/tauchplatz')}>
                            <View style={[styles.quickIcon, styles.quickIconBlue]}>
                                <Ionicons name="pin-outline" size={22} color="#185FA5" />
                            </View>
                            <Text style={styles.quickLabel}>Tauchplatz</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/ausruestung')}>
                            <View style={[styles.quickIcon, styles.quickIconTeal]}>
                                <MaterialCommunityIcons name="bag-personal-outline" size={22} color="#1D9E75" />
                            </View>
                            <Text style={styles.quickLabel}>Ausrüstung</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/buddy')}>
                            <View style={[styles.quickIcon, styles.quickIconPurple]}>
                                <Ionicons name="people-outline" size={22} color="#6D28D9" />
                            </View>
                            <Text style={styles.quickLabel}>Buddy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/(tabs)/logbuch')}>
                            <View style={[styles.quickIcon, styles.quickIconAmber]}>
                                <Ionicons name="book-outline" size={22} color="#EF9F27" />
                            </View>
                            <Text style={styles.quickLabel}>Logbuch</Text>
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
        </View>
    );
}