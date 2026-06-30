import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { styles } from './styles/ausruestungStyles';
import ScreenHeader from '../../components/ui/ScreenHeader';

// Beschreibt, wie ein Ausrüstungsgegenstand aufgebaut ist
type EquipItem = {
    id: string;
    label: string;
    category: string;
    done: boolean;
};

// Standardliste der Ausrüstung
const initialItems: EquipItem[] = [
    { id: '1', label: 'Tauchmaske',            category: 'Sicherheit',    done: false },
    { id: '2', label: 'Atemregler (Haupt+ Oktopus)', category: 'Sicherheit',    done: false },
    { id: '4', label: 'BCD / Tarierweste',      category: 'Auftrieb',      done: false },
    { id: '5', label: 'Tauchcomputer',          category: 'Navigation',    done: false },
    { id: '6', label: 'Neoprenanzug 5 mm',      category: 'Bekleidung',    done: false },
    { id: '7', label: 'Flossen',               category: 'Fortbewegung',  done: false },
    { id: '8', label: 'Lampe / Torch',          category: 'Sicherheit',    done: false },
    { id: '9', label: 'SMB & Reel',             category: 'Sicherheit',    done: false },
];

// Bildschirm für die Ausrüstungs-Checkliste
export default function AusruestungScreen() {

    // Speichert alle Ausrüstungsgegenstände der Checkliste
    // useState sorgt dafür, dass Änderungen sofort auf der Seite angezeigt werden
    const [items, setItems] = useState<EquipItem[]>(initialItems);

    // Wird aufgerufen, wenn ein Gegenstand angeklickt wird
    // Der Status wird zwischen erledigt und offen gewechselt
    const toggle = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, done: !item.done }
                    : item
            )
        );
    };

    // Zählt alle bereits abgehakten Ausrüstungsgegenstände
    const doneCount = items.filter((i) => i.done).length;

    // Gesamtanzahl der Gegenstände
    const total = items.length;

    // Berechnet den Fortschritt für die Fortschrittsleiste
    const progress = doneCount / total;

    return (
        <View style={styles.safeArea}>

            {/* Zeigt den gemeinsamen Seitenkopf mit Titel, Untertitel und Icon */}
            <ScreenHeader
                title="Ausrüstung"
                subtitle="Checkliste vor dem Tauchgang"
                icon="bag-outline"
            />

            {/* Scrollbarer Bereich für die gesamte Checkliste */}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>

                    {/* Zeigt den aktuellen Fortschritt als Text */}
                    <Text style={styles.progressText}>
                        {doneCount} von {total} Ausrüstungsgegenständen gecheckt
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

                    {/* Erstellt für jeden Ausrüstungsgegenstand einen Listeneintrag */}
                    {items.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.checkItem}

                            // Beim Antippen wird der Gegenstand als erledigt oder offen markiert
                            onPress={() => toggle(item.id)}
                            activeOpacity={0.7}
                        >
                            {/* Zeigt einen Kreis oder einen Haken, je nach Status */}
                            <View
                                style={[
                                    styles.checkCircle,
                                    item.done && styles.checkCircleDone,
                                ]}
                            >
                                {item.done && (
                                    <Ionicons
                                        name="checkmark"
                                        size={14}
                                        color="white"
                                    />
                                )}
                            </View>

                            {/* Zeigt den Namen und die Kategorie des Gegenstands */}
                            <View style={styles.checkTextWrap}>
                                <Text
                                    style={[
                                        styles.checkLabel,
                                        item.done && styles.checkLabelDone,
                                    ]}
                                >
                                    {item.label}
                                </Text>

                                <Text style={styles.checkCategory}>
                                    {item.category}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
            </ScrollView>
        </View>
    );
}