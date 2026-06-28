// app/_layout.tsx
import { Stack } from 'expo-router';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export type Dive = {
    id: string;
    location: string;
    depth: number;
    duration: number;
    date: string;
    type: string;
    stars: number;
    buddy?: string,
    notes?: string;
};

export type DiveContextType = {
    dives: Dive[];
    addDive: (dive: Dive) => void;
    deleteDive: (id: string) => Promise<void>;
    updateDive: (dive: Dive) => Promise<void>;
};

export const DiveContext = createContext<DiveContextType>({
    dives: [],
    addDive: () => {},
    deleteDive: async () => {},
    updateDive: async () => {},
});


export function useDives() {
    return useContext(DiveContext);
}


function DiveProvider({ children }: { children: ReactNode }) {
    const [dives, setDives] = useState<Dive[]>([]);

    useEffect(() => {
        const loadDivesFromFirebase = async () => {
            const snapshot = await getDocs(collection(db, 'dives'));

            const firebaseDives = snapshot.docs.map((document) => {
                const data = document.data();

                return {
                    id: document.id,
                    location: String(data.location ?? ''),
                    depth: Number(data.depth ?? 0),
                    duration: Number(data.duration ?? 0),
                    date: String(data.date ?? ''),
                    type: String(data.type ?? ''),
                    stars: Number(data.stars ?? 0),
                    buddy: String(data.buddy ?? ''),
                    notes: String(data.notes ?? ''),
                };
            });

            setDives(firebaseDives);
        };

        loadDivesFromFirebase();
    }, []);

    const addDive = (dive: Dive) => {
        setDives((prev) => [...prev, dive]);
    };
    const deleteDive = async (id: string) => {
        await deleteDoc(doc(db, 'dives', id));
        setDives((prev) => prev.filter((d) => d.id !== id));
    };

    const updateDive = async (dive: Dive) => {
        await updateDoc(doc(db, 'dives', dive.id), {
            location: dive.location,
            depth: dive.depth,
            duration: dive.duration,
            date: dive.date,
            type: dive.type,
            stars: dive.stars,
            buddy: dive.buddy ?? '',
            notes: dive.notes ?? '',
        });

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
                    options={{ presentation: 'modal', headerShown: false }}
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
