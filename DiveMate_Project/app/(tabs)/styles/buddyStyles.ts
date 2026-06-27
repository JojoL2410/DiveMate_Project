import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

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

// Buddy Step
buddyStep: {
flexDirection: 'row',
alignItems: 'flex-start',
gap: 12,
backgroundColor: '#f8f8f8',
borderRadius: 10,
padding: 14,
marginBottom: 8,
},
buddyStepDone: {
backgroundColor: Colors.tealLight,
},
buddyStepIcon: {
width: 36,
height: 36,
borderRadius: 8,
backgroundColor: Colors.white,
borderWidth: 1,
borderColor: '#eee',
justifyContent: 'center',
alignItems: 'center',
},
buddyStepIconDone: {
backgroundColor: Colors.tealAccent,
borderColor: Colors.tealAccent,
},
buddyStepBody: {
flex: 1,
},
buddyStepTitle: {
fontSize: 14,
fontWeight: '500',
color: Colors.textDark,
marginBottom: 2,
},
buddyStepTitleDone: {
color: '#085041',
},
buddyStepDesc: {
fontSize: 12,
color: Colors.grey,
},
buddyStepDescDone: {
color: '#0F6E56',
},
});