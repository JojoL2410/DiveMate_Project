import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from './styles/logbuchStyles';
import { useDives } from '../_layout';
import ScreenHeader from '../../components/ui/ScreenHeader';

export default function LogbuchScreen() {
    const { dives } = useDives();

    return (
        <View style={styles.safeArea}>

            {/* HEADER */}
            <ScreenHeader
                title="Logbuch"
                subtitle={`${dives.length} Tauchgänge gesamt`}
                icon="book-outline"
            />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Meine Tauchgänge</Text>

                    {/* EINTRÄGE */}
                    {dives.map((dive) => (
                        <TouchableOpacity
                            key={dive.id}
                            style={styles.logCard}
                            onPress={() => router.push({ pathname: '/details/diveDetails', params: { id: dive.id } })}
                            activeOpacity={0.7}
                        >
                            {/* Kopfzeile */}
                            <View style={styles.logCardHeader}>
                                <Text style={styles.logLocation}>{dive.location}</Text>
                                <Text style={styles.logDate}>{dive.date}</Text>
                            </View>

                            {/* Stats */}
                            <View style={styles.logStats}>
                                <View style={styles.logStat}>
                                    <Ionicons name="arrow-down-outline" size={14} color="#888" />
                                    <Text style={styles.logStatText}>{dive.depth} m</Text>
                                </View>
                                <View style={styles.logStat}>
                                    <Ionicons name="time-outline" size={14} color="#888" />
                                    <Text style={styles.logStatText}>{dive.duration} min</Text>
                                </View>
                            </View>

                            {/* Footer: Badge + Sterne */}
                            <View style={styles.logCardFooter}>
                                <View style={styles.diveBadge}>
                                    <Ionicons name="pricetag-outline" size={11} color="#042C53" />
                                    <Text style={styles.diveBadgeText}>{dive.type}</Text>
                                </View>
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

                    {/* BUTTON */}
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => router.push('/modal')}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="add" size={18} color="white" />
                        <Text style={styles.addButtonText}>Tauchgang erfassen</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}