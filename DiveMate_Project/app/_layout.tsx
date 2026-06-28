// app/_layout.tsx
import { Stack } from 'expo-router';
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Dive = {
    id: string;
    location: string;
    depth: number;
    duration: number;
    date: string;
    type: string;
    stars: number;
    notes?: string;
};

export type DiveContextType = {
    dives: Dive[];
    addDive: (dive: Dive) => void;
    deleteDive: (id: string) => void;
    updateDive: (dive: Dive) => void;
};

export const DiveContext = createContext<DiveContextType>({
    dives: [],
    addDive: () => {},
    deleteDive: () => {},
    updateDive: () => {},
});


export function useDives() {
    return useContext(DiveContext);
}


function DiveProvider({ children }: { children: ReactNode }) {
    const [dives, setDives] = useState<Dive[]>([
        {
            id: '1',
            location: 'Attersee Süd',
            date: '18. Mai 2025',
            depth: 22,
            duration: 52,
            type: 'Freizeittauchen',
            stars: 5,
        },
        {
            id: '2',
            location: 'Traunsee, Gmunden',
            date: '10. Mai 2025',
            depth: 18,
            duration: 45,
            type: 'Fotografie',
            stars: 4,
        },
        {
            id: '3',
            location: 'Millstätter See',
            date: '03. Mai 2025',
            depth: 28,
            duration: 61,
            type: 'Freizeittauchen',
            stars: 5,
        },
        {
            id: '4',
            location: 'Wörthersee Ost',
            date: '24. Apr 2025',
            depth: 15,
            duration: 38,
            type: 'Ausbildung',
            stars: 3,
        },
    ]);

    const addDive = (dive: Dive) => {
        setDives((prev) => [dive, ...prev]);
    };
    const deleteDive = (id: string) => {
        setDives((prev) => prev.filter((d) => d.id !== id));
    };

    const updateDive = (dive: Dive) => {
        setDives((prev) => prev.map((d) => d.id === dive.id ? dive : d));
    };
    return (
        <DiveContext.Provider value={{ dives, addDive, deleteDive, updateDive }}>
            {children}
        </DiveContext.Provider>
    );
}

export default function RootLayout() {
    return (
        <DiveProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="modal"
                    options={{ presentation: 'modal', title: 'Tauchgang erfassen' }}
                />
                <Stack.Screen
                    name="details/diveDetails"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="details/diveEdit"
                    options={{ headerShown: false }}
                />
            </Stack>
        </DiveProvider>
    );
}
