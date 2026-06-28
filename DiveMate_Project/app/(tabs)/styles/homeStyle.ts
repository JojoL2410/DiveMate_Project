// styles/homeStyles.ts
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
appTitle: {
fontSize: 22,
fontWeight: '600',
color: Colors.white,
letterSpacing: -0.4,
},
appTitleAccent: {
color: '#5DCAA5',
},
gpsBadge: {
flexDirection: 'row',
alignItems: 'center',
gap: 4,
backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    gpsBadgeText: {
        fontSize: 11,
        color: '#9FE1CB',
    },
    locationLine: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    locationLineText: {
        fontSize: 13,
        color: '#B5D4F4',
    },

    // Scroll
    scroll: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    // Gruppen – nur Abstand, keine Card
    group: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 20,
    },
    groupLast: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 32,
    },
    groupTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.oceanDeep,
        marginBottom: 12,
    },

    // Willkommen
    welcomeText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 21,
        marginBottom: 16,
    },

    // Statistiken
    section: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 20,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        color: Colors.grey,
        marginBottom: 12,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 10,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.oceanLight,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        gap: 4,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.oceanDeep,
    },
    statUnit: {
        fontSize: 13,
        color: Colors.oceanMid,
    },
    statLabel: {
        fontSize: 11,
        color: Colors.grey,
        textAlign: 'center',
    },

    // Quick Actions
    quickGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    quickCard: {
        width: '47%',
        backgroundColor: '#fafafa',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    quickIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickIconBlue:   { backgroundColor: Colors.oceanLight },
    quickIconTeal:   { backgroundColor: Colors.tealLight },
    quickIconPurple: { backgroundColor: '#EDE9FE' },
    quickIconAmber:  { backgroundColor: Colors.amberLight },
    quickLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textDark,
    },
    quickSub: {
        fontSize: 11,
        color: Colors.grey,
        marginTop: 2,
    },

    // Letzter Tauchgang
    lastDiveCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.oceanLight,
        borderRadius: 12,
        padding: 14,
    },
    lastDiveLeft: {
        gap: 3,
    },
    lastDiveLocation: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.textDark,
    },
    lastDiveDate: {
        fontSize: 12,
        color: Colors.grey,
    },
    lastDiveStats: {
        gap: 4,
        alignItems: 'flex-end',
    },
    lastDiveStat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    lastDiveStatText: {
        fontSize: 13,
        color: Colors.oceanMid,
        fontWeight: '500',
    },
    emptyDiveCard: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#fafafa',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        gap: 6,
    },
    emptyDiveText: {
        fontSize: 13,
        color: Colors.grey,
        textAlign: 'center',
    },

    // Tauchplatz Vorschlag
    suggestionText: {
        fontSize: 13,
        color: '#555',
        lineHeight: 20,
        marginBottom: 12,
    },
    suggestionMailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    suggestionMail: {
        fontSize: 14,
        fontWeight: '600',
        color: '#185FA5',
    },

    // Legacy
    welcomeTitle: { fontSize: 18, fontWeight: '700', color: Colors.oceanDeep, marginBottom: 6 },
    nextDiveCard: { backgroundColor: Colors.oceanLight, borderRadius: 12, padding: 14, gap: 6 },
    nextDiveTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    nextDiveLocation: { fontSize: 17, fontWeight: '700', color: Colors.oceanDeep },
    diveBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.white, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 8 },
    diveBadgeText: { fontSize: 11, color: Colors.oceanMid, fontWeight: '500' },
    nextDiveRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    nextDiveInfo: { fontSize: 13, color: '#444' },
    suggestionCard: { backgroundColor: Colors.oceanLight, borderRadius: 12, padding: 14, gap: 10 },
    sectionSubLabel: { fontSize: 13, color: Colors.grey, marginBottom: 10, lineHeight: 18 },
    blockDivider: { height: 1, backgroundColor: '#EBEBEB', marginHorizontal: 16 },
    block: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 20 },
    blockLast: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 32 },
    blockTitle: { fontSize: 18, fontWeight: '700', color: Colors.oceanDeep, marginBottom: 4 },
    blockSubText: { fontSize: 13, color: '#666', lineHeight: 19, marginBottom: 14 },
});