// app/(tabs)/ausruestung.tsx
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { styles } from './styles/ausruestungStyles';
import ScreenHeader from '../../components/ui/ScreenHeader';

type EquipItem = {
    id: string;
    label: string;
    category: string;
    done: boolean;
};

const initialItems: EquipItem[] = [
    { id: '1', label: 'Tauchmaske',            category: 'Sicherheit',    done: true  },
    { id: '2', label: 'Atemregler (Haupt)',     category: 'Sicherheit',    done: true  },
    { id: '3', label: 'Atemregler (Oktopus)',   category: 'Sicherheit',    done: true  },
    { id: '4', label: 'BCD / Tarierweste',      category: 'Auftrieb',      done: false },
    { id: '5', label: 'Tauchcomputer',          category: 'Navigation',    done: false },
    { id: '6', label: 'Neoprenanzug 5 mm',      category: 'Bekleidung',    done: false },
    { id: '7', label: 'Flossen',               category: 'Fortbewegung',  done: false },
    { id: '8', label: 'Lampe / Torch',          category: 'Sicherheit',    done: false },
    { id: '9', label: 'SMB & Reel',             category: 'Sicherheit',    done: false },
];

export default function AusruestungScreen() {
    const [items, setItems] = useState<EquipItem[]>(initialItems);

    const toggle = (id: string) => {
        setItems((prev) =>
            prev.map((item) => item.id === id ? { ...item, done: !item.done } : item)
        );
    };

    const doneCount = items.filter((i) => i.done).length;
    const total = items.length;
    const progress = doneCount / total;

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* HEADER */}
            <ScreenHeader
                title="Ausrüstung"
                subtitle="Checkliste vor dem Tauchgang"
                icon="bag-outline"
            />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>

                    {/* FORTSCHRITT */}
                    <Text style={styles.progressText}>
                        {doneCount} von {total} Ausrüstungsgegenständen gecheckt
                    </Text>
                    <View style={styles.progressBarWrap}>
                        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                    </View>

                    {/* LISTE */}
                    {items.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.checkItem}
                            onPress={() => toggle(item.id)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.checkCircle, item.done && styles.checkCircleDone]}>
                                {item.done && <Ionicons name="checkmark" size={14} color="white" />}
                            </View>
                            <View style={styles.checkTextWrap}>
                                <Text style={[styles.checkLabel, item.done && styles.checkLabelDone]}>
                                    {item.label}
                                </Text>
                                <Text style={styles.checkCategory}>{item.category}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}