import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
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

                {/* GRUPPE 1 – Willkommen + Schnellzugriff */}
                <View style={styles.group}>
                    <Text style={styles.groupTitle}>Willkommen bei DiveMate!</Text>
                    <Text style={styles.welcomeText}>
                        DiveMate unterstützt dich dabei, Tauchplätze zu entdecken, deine Ausrüstung zu verwalten,
                        dein Buddy Check-in durchzuführen und deine Tauchgänge im Logbuch festzuhalten.
                    </Text>

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

                {/* GRUPPE 2 – Deine letzten Abenteuer */}
                <View style={styles.group}>
                    <Text style={styles.groupTitle}>Deine letzten Abenteuer</Text>
                    <Text style={styles.groupSubTitle}>
                        Hier findest du deinen zuletzt erfassten Tauchgang mit den wichtigsten Informationen auf einen Blick
                    </Text>
                    {lastDive ? (
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
                    ) : (
                        <View style={styles.emptyDiveCard}>
                            <Ionicons name="fish-outline" size={28} color="#B5D4F4" />
                            <Text style={styles.emptyDiveText}>Noch kein Tauchgang erfasst.</Text>
                            <Text style={styles.emptyDiveText}>Trag deinen ersten Tauchgang im Logbuch ein!</Text>
                        </View>
                    )}
                </View>

                {/* GRUPPE 3 – Tauchplatz vorschlagen */}
                <View style={[styles.group, styles.groupLast]}>
                    <Text style={styles.groupTitle}>Dein Tauchplatz fehlt?</Text>
                    <Text style={styles.suggestionText}>
                        Kennst du einen besonderen Tauchplatz, der noch nicht in DiveMate vorhanden ist?
                        Dann schreib uns eine Nachricht. Wir prüfen deinen Vorschlag und nehmen ihn bei
                        passenden Informationen gerne in DiveMate auf.
                    </Text>
                    <TouchableOpacity
                        style={styles.suggestionMailRow}
                        onPress={() => Linking.openURL('mailto:divemate@mail.com')}
                    >
                        <Ionicons name="mail-outline" size={15} color="#185FA5" />
                        <Text style={styles.suggestionMail}>divemate@mail.com</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}