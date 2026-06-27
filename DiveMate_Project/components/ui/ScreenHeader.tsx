// components/ui/ScreenHeader.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

type Props = {
    title: string;
    subtitle?: string;
    icon?: keyof typeof Ionicons.glyphMap;
};

export default function ScreenHeader({ title, subtitle, icon }: Props) {
    return (
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <Text style={styles.headerTitle}>{title}</Text>
                {icon && <Ionicons name={icon} size={22} color="rgba(255,255,255,0.5)" />}
            </View>
            {subtitle && (
                <Text style={styles.headerSubtitle}>{subtitle}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.oceanDeep,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 18,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: Colors.white,
        letterSpacing: -0.4,
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#B5D4F4',
        marginTop: 4,
    },
});