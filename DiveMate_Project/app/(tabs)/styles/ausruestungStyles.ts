// styles/ausruestungStyles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.oceanDeep,
        paddingTop: 60,
    },

    // Header
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
        marginBottom: 8,
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
    },

    // Scroll & Section
    scroll: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    section: {
        padding: 14,
    },

    // Fortschritt
    progressText: {
        fontSize: 12,
        color: Colors.grey,
        marginBottom: 6,
    },
    progressBarWrap: {
        height: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginBottom: 16,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.tealAccent,
        borderRadius: 4,
    },

    // Checklist Item
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    checkCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1.5,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkCircleDone: {
        backgroundColor: Colors.tealAccent,
        borderColor: Colors.tealAccent,
    },
    checkTextWrap: {
        flex: 1,
    },
    checkLabel: {
        fontSize: 14,
        color: Colors.textDark,
    },
    checkLabelDone: {
        color: '#aaa',
        textDecorationLine: 'line-through',
    },
    checkCategory: {
        fontSize: 11,
        color: '#aaa',
        marginTop: 1,
    },
});