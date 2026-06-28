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
        paddingBottom: 24,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    backButton: {
        padding: 4,
    },
    headerLocation: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.white,
        letterSpacing: -0.4,
        flex: 1,
    },
    headerDate: {
        fontSize: 13,
        color: '#B5D4F4',
        marginLeft: 40,
    },

    // Stats Row
    statsRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 14,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        gap: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 3,
    },
    statValue: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.oceanDeep,
    },
    statUnit: {
        fontSize: 12,
        color: Colors.oceanMid,
        fontWeight: '400',
    },
    statLabel: {
        fontSize: 11,
        color: Colors.grey,
    },

    // Scroll
    scroll: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContent: {
        paddingTop: 36,
    },

    // Section
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

    // Typ Badge
    typeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        backgroundColor: Colors.oceanLight,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    typeBadgeText: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.oceanDeep,
    },

    // Sterne
    starsRow: {
        flexDirection: 'row',
        gap: 6,
    },

    // Notizen
    notesBox: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 14,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    notesText: {
        fontSize: 14,
        color: Colors.textDark,
        lineHeight: 20,
    },
    notesEmpty: {
        fontSize: 14,
        color: '#bbb',
        fontStyle: 'italic',
    },

    // Nicht gefunden
    notFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        backgroundColor: Colors.white,
    },
    notFoundText: {
        fontSize: 16,
        color: Colors.grey,
    },
});