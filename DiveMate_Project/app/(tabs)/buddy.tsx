// app/(tabs)/buddy.tsx

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { styles } from './styles/buddyStyles';
import ScreenHeader from '../../components/ui/ScreenHeader';

// Beschreibt einen einzelnen Schritt im Buddy-Check
// Jeder Schritt hat eine ID, einen Titel, eine Beschreibung, ein Icon und einen Status
type BuddyStep = {
    id: string;
    title: string;
    desc: string;
    icon: keyof typeof Ionicons.glyphMap;
    done: boolean;
};

// Standard-Schritte, die beim Start der Seite angezeigt werden
// done ist am Anfang false, weil noch kein Schritt abgehakt wurde
const initialSteps: BuddyStep[] = [
    {
        id: '1',
        title: 'BCD & Tarierung',
        desc: 'BCD prüfen, Tarierweste aufblasen und ablassen',
        icon: 'shield-outline',
        done: false,
    },
    {
        id: '2',
        title: 'Atemregler',
        desc: 'Haupt- und Backup-Regler auf Luftfluss testen',
        icon: 'partly-sunny-outline',
        done: false,
    },
    {
        id: '3',
        title: 'Releases & Gurte',
        desc: 'Alle Verschlüsse auf Funktion und Sitz prüfen',
        icon: 'lock-closed-outline',
        done: false,
    },
    {
        id: '4',
        title: 'Verbleibende Luft',
        desc: 'Manometer ablesen, min. 200 bar vor Abtauchen',
        icon: 'speedometer-outline',
        done: false,
    },
    {
        id: '5',
        title: 'Final Okay-Signal',
        desc: 'Handzeichen und Notfall-Kommunikation bestätigen',
        icon: 'checkmark-circle-outline',
        done: false,
    },
];

// Buddy-Check-Seite mit allen Prüfschritten vor dem Tauchgang
export default function BuddyScreen() {

    // Speichert alle Buddy-Check-Schritte
    // useState sorgt dafür, dass sich die Anzeige nach einer Änderung automatisch aktualisiert
    const [steps, setSteps] = useState<BuddyStep[]>(initialSteps);

    // Wird aufgerufen, wenn ein Prüfschritt angeklickt wird
    // Der Status des ausgewählten Schrittes wird zwischen erledigt und offen gewechselt
    const toggle = (id: string) => {
        setSteps((prev) =>
            prev.map((step) =>
                step.id === id
                    ? { ...step, done: !step.done }
                    : step
            )
        );
    };

    // Zählt alle bereits erledigten Prüfschritte
    const doneCount = steps.filter((s) => s.done).length;

    // Gesamtanzahl aller Prüfschritte
    const total = steps.length;

    // Berechnet den Fortschritt für die Fortschrittsleiste
    const progress = doneCount / total;

    return (
        <View style={styles.safeArea}>

            {/* Zeigt den gemeinsamen Seitenkopf mit Titel und Untertitel */}
            <ScreenHeader
                title="Buddy-Check"
                subtitle="5 Schritte vor dem Abtauchen"
                icon="people-outline"
            />

            {/* Scrollbarer Bereich für den Buddy-Check */}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>

                    {/* Zeigt den aktuellen Fortschritt als Text */}
                    <Text style={styles.progressText}>
                        {doneCount} von {total} Schritten abgeschlossen
                    </Text>

                    {/* Grafische Darstellung des Fortschritts */}
                    <View style={styles.progressBarWrap}>
                        <View
                            style={[
                                styles.progressBarFill,
                                { width: `${progress * 100}%` },
                            ]}
                        />
                    </View>

                    {/* Erstellt für jeden Prüfschritt einen Listeneintrag */}
                    {steps.map((step) => (
                        <TouchableOpacity
                            key={step.id}
                            style={[styles.buddyStep, step.done && styles.buddyStepDone]}
                            // Beim Antippen wird der jeweilige Schritt als erledigt oder offen markiert
                            onPress={() => toggle(step.id)}
                            activeOpacity={0.7}
                        >
                            {/* Zeigt je nach Status das passende Icon an */}
                            <View
                                style={[
                                    styles.buddyStepIcon,
                                    step.done && styles.buddyStepIconDone,
                                ]}
                            >
                                <Ionicons
                                    name={step.done ? 'checkmark-circle' : step.icon}
                                    size={18}
                                    color={step.done ? 'white' : '#185FA5'}
                                />
                            </View>

                            {/* Zeigt Titel und Beschreibung des Prüfschritts */}
                            <View style={styles.buddyStepBody}>
                                <Text
                                    style={[
                                        styles.buddyStepTitle,
                                        step.done && styles.buddyStepTitleDone,
                                    ]}
                                >
                                    {step.title}
                                </Text>

                                <Text
                                    style={[
                                        styles.buddyStepDesc,
                                        step.done && styles.buddyStepDescDone,
                                    ]}
                                >
                                    {step.desc}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
            </ScrollView>
        </View>
    );
}