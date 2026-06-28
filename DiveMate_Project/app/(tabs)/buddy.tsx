import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { styles } from './styles/buddyStyles';
import ScreenHeader from '../../components/ui/ScreenHeader';

type BuddyStep = {
    id: string;
    title: string;
    desc: string;
    icon: keyof typeof Ionicons.glyphMap;
    done: boolean;
};

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

export default function BuddyScreen() {
    const [steps, setSteps] = useState<BuddyStep[]>(initialSteps);

    const toggle = (id: string) => {
        setSteps((prev) =>
            prev.map((step) => step.id === id ? { ...step, done: !step.done } : step)
        );
    };

    const doneCount = steps.filter((s) => s.done).length;
    const total = steps.length;
    const progress = doneCount / total;

    return (
        <View style={styles.safeArea}>

            {/* HEADER */}
            <ScreenHeader
                title="Buddy-Check"
                subtitle="5 Schritte vor dem Abtauchen"
                icon="people-outline"
            />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>

                    {/* FORTSCHRITT */}
                    <Text style={styles.progressText}>
                        {doneCount} von {total} Schritten abgeschlossen
                    </Text>
                    <View style={styles.progressBarWrap}>
                        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                    </View>

                    {/* SCHRITTE */}
                    {steps.map((step) => (
                        <TouchableOpacity
                            key={step.id}
                            style={[styles.buddyStep, step.done && styles.buddyStepDone]}
                            onPress={() => toggle(step.id)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.buddyStepIcon, step.done && styles.buddyStepIconDone]}>
                                <Ionicons
                                    name={step.done ? 'checkmark-circle' : step.icon}
                                    size={18}
                                    color={step.done ? 'white' : '#185FA5'}
                                />
                            </View>
                            <View style={styles.buddyStepBody}>
                                <Text style={[styles.buddyStepTitle, step.done && styles.buddyStepTitleDone]}>
                                    {step.title}
                                </Text>
                                <Text style={[styles.buddyStepDesc, step.done && styles.buddyStepDescDone]}>
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