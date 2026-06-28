// styles/tauchplatzStyles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.oceanDeep,
        paddingTop: 60,
    },
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
        marginTop: 2,
    },
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
    lakeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        gap: 12,
    },
    lakeIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.oceanLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lakeInfo: {
        flex: 1,
    },
    lakeName: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textDark,
    },
    lakeDepth: {
        fontSize: 12,
        color: Colors.grey,
        marginTop: 2,
    },
    gpsContainer: {
        padding: 16,
        paddingBottom: 24,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    gpsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: Colors.oceanMid,
        borderRadius: 12,
        padding: 14,
    },
    gpsButtonText: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: '600',
    },
    gpsError: {
        fontSize: 13,
        color: '#A32D2D',
        textAlign: 'center',
        marginBottom: 10,
    },
});