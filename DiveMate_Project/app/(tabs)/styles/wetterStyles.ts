// styles/wetterStyles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
safeArea: {
flex: 1,
backgroundColor: Colors.oceanDeep,
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
locationLine: {
flexDirection: 'row',
alignItems: 'center',
gap: 5,
},
locationLineText: {
fontSize: 13,
color: '#B5D4F4',
},

// Scroll & Sections
scroll: {
flex: 1,
backgroundColor: Colors.white,
},
section: {
padding: 14,
borderBottomWidth: 1,
borderBottomColor: '#f0f0f0',
},
sectionLabel: {
fontSize: 11,
fontWeight: '600',
textTransform: 'uppercase',
letterSpacing: 0.8,
color: Colors.grey,
marginBottom: 10,
},

// Wetter-Grid
weatherGrid: {
flexDirection: 'row',
flexWrap: 'wrap',
gap: 8,
marginBottom: 4,
},
weatherCard: {
width: '47%',
backgroundColor: Colors.oceanLight,
borderRadius: 10,
padding: 12,
},
weatherCardLabel: {
fontSize: 11,
color: Colors.oceanMid,
marginBottom: 2,
},
weatherCardValue: {
fontSize: 26,
fontWeight: '600',
color: Colors.oceanDeep,
},
weatherCardUnit: {
fontSize: 13,
color: Colors.oceanMid,
},

// Tauglichkeit Pills
conditionsRow: {
flexDirection: 'row',
flexWrap: 'wrap',
gap: 6,
},
pill: {
flexDirection: 'row',
alignItems: 'center',
gap: 4,
paddingVertical: 5,
paddingHorizontal: 10,
borderRadius: 20,
},
pillGreen: {
backgroundColor: Colors.tealLight,
},
pillAmber: {
backgroundColor: Colors.amberLight,
},
// NEU: roter Status (z.B. sehr starker Wind, sehr kaltes Wasser)
pillRed: {
backgroundColor: '#FDDEDE',
},
pillTextGreen: {
fontSize: 12,
fontWeight: '500',
color: '#085041',
},
pillTextAmber: {
fontSize: 12,
fontWeight: '500',
color: '#633806',
},
// NEU
pillTextRed: {
fontSize: 12,
fontWeight: '500',
color: '#7B1515',
},

// Tagesübersicht
dayRow: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingVertical: 10,
borderBottomWidth: 1,
borderBottomColor: '#f5f5f5',
},
dayTime: {
fontSize: 13,
color: Colors.grey,
width: 44,
},
dayCondition: {
flexDirection: 'row',
alignItems: 'center',
gap: 5,
flex: 1,
fontSize: 13,
color: Colors.textDark,
},
dayConditionText: {
fontSize: 13,
color: Colors.textDark,
},

// Offline Banner
offlineBanner: {
flexDirection: 'row',
alignItems: 'center',
gap: 8,
backgroundColor: '#FFF3CD',
borderWidth: 1,
borderColor: '#FAC775',
borderRadius: 10,
padding: 12,
},
offlineBannerText: {
fontSize: 13,
color: '#633806',
flex: 1,
},
});