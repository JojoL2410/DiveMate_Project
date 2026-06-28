// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
    return (
        <Tabs
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
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="tauchplatz"
                options={{
                    title: 'Tauchplätze',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pin-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="wetter"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="ausruestung"
                options={{
                    title: 'Ausrüstung.',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bag-personal-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="buddy"
                options={{
                    title: 'Buddy',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="logbuch"
                options={{
                    title: 'Logbuch',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}