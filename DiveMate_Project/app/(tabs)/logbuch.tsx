// app/(tabs)/logbuch.tsx

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from './styles/logbuchStyles';
import { useDives } from '../_layout';
import ScreenHeader from '../../components/ui/ScreenHeader';

// Logbuch-Seite mit allen gespeicherten Tauchgängen
export default function LogbuchScreen() {

    // Holt alle gespeicherten Tauchgänge aus dem DiveContext
    // Änderungen werden automatisch übernommen und auf der Seite angezeigt
    const { dives } = useDives();

    return (
        <View style={styles.safeArea}>

            {/* Zeigt den gemeinsamen Seitenkopf mit Titel, Anzahl der Tauchgänge und Icon */}
            <ScreenHeader
                title="Logbuch"
                subtitle={`${dives.length} Tauchgänge gesamt`}
                icon="book-outline"
            />

            {/* Scrollbarer Bereich für alle Tauchgangseinträge */}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Meine Tauchgänge</Text>

                    {/* Durchläuft alle gespeicherten Tauchgänge
                        Für jeden Tauchgang wird eine eigene Karte erstellt */}
                    {dives.map((dive) => (
                        <TouchableOpacity
                            key={dive.id}
                            style={styles.logCard}

                            // Öffnet beim Antippen die Detailansicht des ausgewählten Tauchgangs
                            // Die ID wird übergeben, damit der richtige Eintrag geladen werden kann
                            onPress={() =>
                                router.push({
                                    pathname: '/details/diveDetails',
                                    params: { id: dive.id }
                                })
                            }
                            activeOpacity={0.7}
                        >

                            {/* Zeigt den Tauchplatz und das Datum */}
                            <View style={styles.logCardHeader}>
                                <Text style={styles.logLocation}>{dive.location}</Text>
                                <Text style={styles.logDate}>{dive.date}</Text>
                            </View>

                            {/* Zeigt wichtige Informationen zum Tauchgang */}
                            <View style={styles.logStats}>
                                <View style={styles.logStat}>
                                    <Ionicons name="arrow-down-outline" size={14} color="#888" />
                                    <Text style={styles.logStatText}>
                                        {dive.depth} m
                                    </Text>
                                </View>

                                <View style={styles.logStat}>
                                    <Ionicons name="time-outline" size={14} color="#888" />
                                    <Text style={styles.logStatText}>
                                        {dive.duration} min
                                    </Text>
                                </View>
                            </View>

                            {/* Zeigt den Tauchtyp und die persönliche Bewertung */}
                            <View style={styles.logCardFooter}>
                                <View style={styles.diveBadge}>
                                    <Ionicons name="pricetag-outline" size={11} color="#042C53" />
                                    <Text style={styles.diveBadgeText}>
                                        {dive.type}
                                    </Text>
                                </View>

                                {/* Erstellt fünf Sterne und färbt je nach Bewertung die passende Anzahl ein */}
                                <View style={styles.starsRow}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Ionicons
                                            key={i}
                                            name="star"
                                            size={14}
                                            color={i < dive.stars ? '#EF9F27' : '#ddd'}
                                        />
                                    ))}
                                </View>
                            </View>

                        </TouchableOpacity>
                    ))}

                </View>
            </ScrollView>

            {/* Button öffnet das Formular zum Anlegen eines neuen Tauchgangs */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/modal')}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add" size={18} color="white" />
                    <Text style={styles.addButtonText}>
                        Tauchgang erfassen
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}