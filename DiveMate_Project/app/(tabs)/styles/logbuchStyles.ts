// styles/logbuchStyles.ts
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
sectionLabel: {
fontSize: 11,
fontWeight: '600',
textTransform: 'uppercase',
letterSpacing: 0.8,
color: Colors.grey,
marginBottom: 10,
},

// Log Entry Card
logCard: {
backgroundColor: Colors.white,
borderWidth: 1,
borderColor: '#eee',
borderRadius: 10,
padding: 14,
marginBottom: 8,
},
logCardHeader: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'flex-start',
marginBottom: 6,
},
logLocation: {
fontSize: 15,
fontWeight: '500',
color: Colors.textDark,
},
logDate: {
fontSize: 11,
color: '#aaa',
},
logStats: {
flexDirection: 'row',
gap: 12,
marginBottom: 8,
},
logStat: {
flexDirection: 'row',
alignItems: 'center',
gap: 4,
},
logStatText: {
fontSize: 12,
color: Colors.grey,
},
logCardFooter: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},
diveBadge: {
flexDirection: 'row',
alignItems: 'center',
gap: 4,
backgroundColor: Colors.oceanLight,
borderRadius: 20,
paddingVertical: 3,
paddingHorizontal: 8,
},
diveBadgeText: {
fontSize: 11,
fontWeight: '500',
color: Colors.oceanDeep,
},
starsRow: {
flexDirection: 'row',
gap: 2,
},

// Add Button
    buttonContainer: {
        padding: 16,
        paddingBottom: 24,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.oceanDeep,
    borderRadius: 12,
    padding: 14,
},
addButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
},
});