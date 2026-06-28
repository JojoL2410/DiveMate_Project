// app/(tabs)/dive/[id].tsx
import { View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { useDives } from '../_layout';
import { styles } from '../(tabs)/styles/diveDetailsStyles';

export default function DiveDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { dives, deleteDive, updateDive } = useDives();
    const dive = dives.find((d) => d.id === id);

    if (!dive) {
        return (
            <View style={styles.notFound}>
            <Ionicons name="alert-circle-outline" size={48} color="#ddd" />
        <Text style={styles.notFoundText}>Tauchgang nicht gefunden</Text>
        <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: '#185FA5', fontSize: 14 }}>Zurück</Text>
        </TouchableOpacity>
        </View>
    );
    }
    const handleDelete = () => {
        Alert.alert(
            'Tauchgang löschen',
            `Möchtest du "${dive?.location}" wirklich löschen?`,
            [
                { text: 'Abbrechen', style: 'cancel' },
                {
                    text: 'Löschen',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteDive(id);
                        router.back();
                    },
                },
            ]
        );
    };
    return (
        <View style={styles.safeArea}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerLocation} numberOfLines={1}>
                        {dive.location}
                    </Text>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity
                            style={[styles.headerBtn, styles.headerBtnEdit]}
                            onPress={() => router.push({
                                pathname: '/details/diveEdit',
                                params: { id: dive.id }
                            })}
                        >
                            <Ionicons name="pencil-outline" size={16} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.headerBtn, styles.headerBtnDelete]}
                            onPress={handleDelete}
                        >
                            <Ionicons name="trash-outline" size={16} color="#FF6B6B" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.headerDate}>{dive.date}</Text>
            </View>

    <View style={styles.statsRow}>
    <View style={styles.statCard}>
    <Ionicons name="arrow-down-outline" size={20} color="#185FA5" />
    <Text style={styles.statValue}>
        {dive.depth}
        <Text style={styles.statUnit}> m</Text>
        </Text>
        <Text style={styles.statLabel}>Tiefe</Text>
        </View>
        <View style={styles.statCard}>
    <Ionicons name="time-outline" size={20} color="#185FA5" />
    <Text style={styles.statValue}>
        {dive.duration}
        <Text style={styles.statUnit}> min</Text>
        </Text>
        <Text style={styles.statLabel}>Dauer</Text>
        </View>
        <View style={styles.statCard}>
    <Ionicons name="star" size={20} color="#EF9F27" />
    <Text style={styles.statValue}>
        {dive.stars}
        <Text style={styles.statUnit}>/5</Text>
        </Text>
        <Text style={styles.statLabel}>Bewertung</Text>
        </View>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} >

        {/* TAUCHTYP */}
        <View style={styles.section}>
    <Text style={styles.sectionLabel}>Tauchtyp</Text>
        <View style={styles.typeBadge}>
    <Ionicons name="pricetag-outline" size={14} color="#042C53" />
    <Text style={styles.typeBadgeText}>{dive.type}</Text>
        </View>
        </View>

    {/* BEWERTUNG */}
    <View style={styles.section}>
    <Text style={styles.sectionLabel}>Bewertung</Text>
        <View style={styles.starsRow}>
        {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                    key={i}
            name="star"
            size={28}
            color={i < dive.stars ? '#EF9F27' : '#ddd'}
    />
))}
    </View>
    </View>
            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Tauch-Buddy</Text>
                <View style={styles.notesBox}>
                    {dive.buddy && dive.buddy.trim() !== '' ? (
                        <Text style={styles.notesText}>{dive.buddy}</Text>
                    ) : (
                        <Text style={styles.notesEmpty}>Keine Notizen vorhanden</Text>
                    )}
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Notizen</Text>
                <View style={styles.notesBox}>
                    {dive.notes && dive.notes.trim() !== '' ? (
                        <Text style={styles.notesText}>{dive.notes}</Text>
                    ) : (
                        <Text style={styles.notesEmpty}>Keine Notizen vorhanden</Text>
                    )}
                </View>
            </View>

    </ScrollView>
    </View>
);
}