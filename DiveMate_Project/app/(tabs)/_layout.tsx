// app/(tabs)/_layout.tsx
// Legt die untere Tab-Navigation der App fest
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

// Erstellt das Layout für alle Tabs
export default function TabLayout() {
    return (
        <Tabs
            // Allgemeine Einstellungen für alle Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.oceanMid,
                tabBarInactiveTintColor: Colors.grey,
                tabBarStyle: {
                    backgroundColor: '#f8f8f8',
                    borderTopColor: '#e8e8e8',
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                },
                headerStyle: {
                    backgroundColor: Colors.oceanDeep,
                },
                headerTintColor: Colors.white,
                headerShown: false,
            }}
        >

            {/* Home-Tab */}
            <Tabs.Screen
                name="index" // Verknüpft mit index.tsx
                options={{
                    title: 'Home',

                    // Symbol für den Home-Tab
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            {/* Tauchplätze-Tab */}
            <Tabs.Screen
                name="tauchplatz"
                options={{
                    title: 'Tauchplätze',

                    // Karten-Symbol
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="map-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            {/* Wetter-Seite wird nicht in der Tab-Leiste angezeigt */}
            <Tabs.Screen
                name="wetter"
                options={{
                    href: null,
                }}
            />

            {/* Ausrüstungs-Tab */}
            <Tabs.Screen
                name="ausruestung"
                options={{
                    title: 'Ausrüstung.',

                    // Taschen-Symbol
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="bag-personal-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            {/* Buddy-Tab */}
            <Tabs.Screen
                name="buddy"
                options={{
                    title: 'Buddy',

                    // Personen-Symbol
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="people-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            {/* Logbuch-Tab */}
            <Tabs.Screen
                name="logbuch"
                options={{
                    title: 'Logbuch',

                    // Buch-Symbol
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="book-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}