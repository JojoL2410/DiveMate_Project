// app/details/diveEdit.tsx
import {
    View, Text, TextInput, ScrollView,
    TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useDives } from '../_layout';
import { styles } from '../(tabs)/styles/modalStyles';

const DIVE_TYPES = ['Freizeittauchen', 'Fotografie', 'Ausbildung', 'Technisch', 'Nachttauchen'];

export default function DiveEditScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { dives, updateDive } = useDives();
    const dive = dives.find((d) => d.id === id);

    // ✅ Hooks IMMER zuerst – vor jedem return
    const [location, setLocation] = useState(dive?.location ?? '');
    const [depth, setDepth]       = useState(String(dive?.depth ?? ''));
    const [duration, setDuration] = useState(String(dive?.duration ?? ''));
    const [type, setType]         = useState(dive?.type ?? 'Freizeittauchen');
    const [stars, setStars]       = useState(dive?.stars ?? 0);
    const [notes, setNotes]       = useState(dive?.notes ?? '');

    // ✅ Early return NACH den Hooks
    if (!dive) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#A32D2D' }}>Tauchgang nicht gefunden.</Text>
            </View>
        );
    }
    const isValid = location.trim() !== '' && depth !== '' && duration !== '';

    const handleSave = () => {
        if (!isValid) return;
        updateDive({
            ...dive,
            location: location.trim(),
            depth: parseFloat(depth),
            duration: parseInt(duration),
            type,
            stars,
            notes,
        });
        router.back();
    };

    return (
        <View style={styles.safeArea}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        {/* HEADER */}
        <View style={styles.header}>
    <View style={styles.headerTop}>
    <Text style={styles.headerTitle}>Tauchgang bearbeiten</Text>
    <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
    <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        </View>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ORT & DATEN */}
        <View style={styles.section}>
    <Text style={styles.sectionLabel}>Tauchgang</Text>
        <View style={styles.inputRow}>
    <Ionicons name="location-outline" size={18} color="#888" />
    <TextInput
        style={styles.input}
    placeholder="Ort / Tauchstelle"
    placeholderTextColor="#bbb"
    value={location}
    onChangeText={setLocation}
    />
    </View>
    <View style={styles.inputRow}>
    <Ionicons name="arrow-down-outline" size={18} color="#888" />
    <TextInput
        style={styles.input}
    placeholder="Tiefe (m)"
    placeholderTextColor="#bbb"
    value={depth}
    onChangeText={setDepth}
    keyboardType="decimal-pad"
        />
        </View>
        <View style={styles.inputRow}>
    <Ionicons name="time-outline" size={18} color="#888" />
    <TextInput
        style={styles.input}
    placeholder="Dauer (min)"
    placeholderTextColor="#bbb"
    value={duration}
    onChangeText={setDuration}
    keyboardType="number-pad"
        />
        </View>
        </View>

    {/* TAUCHTYP */}
    <View style={styles.section}>
    <Text style={styles.sectionLabel}>Tauchtyp</Text>
        <View style={styles.typeGrid}>
        {DIVE_TYPES.map((t) => (
                <TouchableOpacity
                    key={t}
            style={[styles.typeButton, type === t && styles.typeButtonActive]}
    onPress={() => setType(t)}
    activeOpacity={0.7}
    >
    <Text style={[styles.typeButtonText, type === t && styles.typeButtonTextActive]}>
    {t}
    </Text>
    </TouchableOpacity>
))}
    </View>
    </View>

    {/* BEWERTUNG */}
    <View style={styles.section}>
    <Text style={styles.sectionLabel}>Bewertung</Text>
        <View style={styles.starsRow}>
        {Array.from({ length: 5 }).map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setStars(i + 1)} activeOpacity={0.7}>
    <Ionicons
        name="star"
    size={32}
    color={i < stars ? '#EF9F27' : '#ddd'}
    />
    </TouchableOpacity>
))}
    </View>
    </View>

    {/* NOTIZEN */}
    <View style={styles.section}>
    <Text style={styles.sectionLabel}>Notizen</Text>
        <TextInput
    style={styles.notesInput}
    placeholder="Besonderheiten, Sichtweite, Tier-Sichtungen…"
    placeholderTextColor="#bbb"
    value={notes}
    onChangeText={setNotes}
    multiline
    />
    </View>

    </ScrollView>

    {/* FOOTER */}
    <View style={styles.footer}>
    <TouchableOpacity
        style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
    onPress={handleSave}
    activeOpacity={0.8}
    disabled={!isValid}
>
    <Ionicons name="save-outline" size={18} color="white" />
    <Text style={styles.saveButtonText}>Änderungen speichern</Text>
    </TouchableOpacity>
    </View>

    </KeyboardAvoidingView>
    </View>
);
}