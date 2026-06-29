// app/modal.tsx
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';
import { useDives } from './_layout';
import { styles } from './(tabs)/styles/modalStyles';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Auswahlmöglichkeiten fuer den Tauchtyp
const DIVE_TYPES = ['Freizeittauchen', 'Fotografie', 'Ausbildung', 'Technisch', 'Nachttauchen'];

// Formular zum Erfassen eines neuen Tauchgangs
export default function ModalScreen() {
    // addDive aus Logbuch-Context
    // Neuer Tauchgang nach Speichern sofort angezeigt
    const { addDive } = useDives();

    // Speichert Eingaben des Formulars, solange Screen geöffnet ist
    const [location, setLocation]   = useState('');
    const [depth, setDepth]         = useState('');
    const [duration, setDuration]   = useState('');
    const [type, setType]           = useState('Freizeittauchen');
    const [stars, setStars]         = useState(0);
    const [buddy, setBuddy]      = useState('');
    const [notes, setNotes]         = useState('');

    // Ort, Tiefe & Dauer -> Pflichtfelder.
    // Diese Felder ausgefüllt -> kann gespeichert werden
    const isValid = location.trim() !== '' && depth !== '' && duration !== '';

    // Speichern-Button gedrückt
    const handleSave = async () => {
        // Pflichtfelder fehlen -> nicht gespeichert
        if (!isValid) return;

        // Erstellt aus Formularwerten neues Tauchgang-Objekt
        const newDive = {
            id: Date.now().toString(),
            location: location.trim(),
            depth: parseFloat(depth),
            duration: parseInt(duration),
            date: new Date().toLocaleDateString('de-AT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
            createdAt: Date.now(),
            type,
            stars,
            buddy,
            notes,
        };

        try {
            //Speichert neuen Tauchgang in Firebase
            await setDoc(doc(db, 'dives', newDive.id), newDive);

            //Tauchgang lokal angezeigt & Formular geschlossen
            addDive(newDive);
            router.back();
        } catch {
            Alert.alert(
                'Keine Verbindung',
                'Der Tauchgang konnte nicht gespeichert werden. Bitte prüfe deine Internetverbindung und versuche es erneut.'
            );
        }
    };

    return (
        <View style={styles.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} >

                {/* Kopfbereich mit Titel und Schliessen-Button */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <Text style={styles.headerTitle}>Tauchgang erfassen</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                    {/* Eingabefelder fuer Ort, Tiefe und Dauer */}
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
                        <Text style={styles.inputHint}>z.B. 18.5 für 18,5 Meter</Text>

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

                    {/* Auswahl des Tauchtyps */}
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

                    {/* Bewertung mit 1 bis 5 Sternen */}
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

                    {/* Eingabefeld für den Tauch-Buddy */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Tauch-Buddy</Text>
                        <TextInput
                            style={styles.notesInput}
                            placeholder="Dein Buddy"
                            placeholderTextColor="#bbb"
                            value={buddy}
                            onChangeText={setBuddy}
                            multiline
                        />
                    </View>

                    {/* Eingabefeld fuer zusätzliche Notizen */}
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

                {/* Speichern-Button am unteren Bildschirmrand */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
                        onPress={handleSave}
                        activeOpacity={0.8}
                        disabled={!isValid}
                    >
                        <Ionicons name="save-outline" size={18} color="white" />
                        <Text style={styles.saveButtonText}>Tauchgang speichern</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </View>
    );
}