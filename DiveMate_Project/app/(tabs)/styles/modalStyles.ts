// styles/modalStyles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    // Header
    header: {
        backgroundColor: Colors.oceanDeep,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.white,
        letterSpacing: -0.4,
    },
    closeButton: {
        padding: 4,
    },

    // Scroll
    scroll: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    section: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        color: Colors.grey,
        marginBottom: 12,
    },

    // Input
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: Colors.textDark,
    },
    inputHint: {
        fontSize: 11,
        color: '#aaa',
        marginTop: -4,
        marginBottom: 10,
        marginLeft: 4,
    },

    // Tauchtyp Auswahl
    typeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    typeButton: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: Colors.border,
        backgroundColor: '#f8f8f8',
    },
    typeButtonActive: {
        borderColor: Colors.oceanMid,
        backgroundColor: Colors.oceanLight,
    },
    typeButtonText: {
        fontSize: 13,
        color: Colors.grey,
        fontWeight: '500',
    },
    typeButtonTextActive: {
        color: Colors.oceanMid,
    },

    // Sterne
    starsRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 4,
    },

    // Notizen
    notesInput: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 12,
        fontSize: 14,
        color: Colors.textDark,
        minHeight: 90,
        textAlignVertical: 'top',
    },

    // Footer Button
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: Colors.white,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: Colors.oceanDeep,
        borderRadius: 10,
        padding: 15,
    },
    saveButtonDisabled: {
        backgroundColor: '#aaa',
    },
    saveButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.white,
    },
});