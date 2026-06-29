// app/_layout.tsx
// Beschreibt, wie ein Tauchgang aufgebaut ist
import { Stack } from 'expo-router';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Beschreibt Daten von Tauchgang
// Pflichtfelder werden definiert (wichtig für TypeScript)
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

// Beschreibt, welche Daten und Funktionen der Context bereitstellt
// Werte können in verschiedene Screens verwendet werden
export type DiveContextType = {
    dives: Dive[];
    addDive: (dive: Dive) => void;
    deleteDive: (id: string) => Promise<void>;
    updateDive: (dive: Dive) => Promise<void>;
};
// Erstellt Context für Logbuchdaten
// Kein Provider aktiv ist -> Standartwerte verwendet
export const DiveContext = createContext<DiveContextType>({
    dives: [],
    addDive: () => {},
    deleteDive: async () => {},
    updateDive: async () => {},
});

// Hook, damit andere Dateien einfacher auf Logbuchdaten zugreifen können
export function useDives() {
    return useContext(DiveContext);
}

// Verwaltet die Tauchgänge für ganze App
function DiveProvider({ children }: { children: ReactNode }) {
    // Speichert aktuell geladenen Tauchgänge
    // Firebase speichert Daten dauerhaft
    // useState sorgt für die Anzeige in der App
    const [dives, setDives] = useState<Dive[]>([]);

    // Start der App -> alle gespeicherten Tauchgänge aus Firebase laden
    useEffect(() => {
        const loadDivesFromFirebase = async () => {
            // Holt alle "dives" aus Firebase
            const snapshot = await getDocs(collection(db, 'dives'));

            // Wandelt Firebase-Dokumente in Tauchgang-Objekte um (für Anzeige)
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
            // Speichert die geladenen Tauchgänge im lokalen Zustand
            setDives(firebaseDives);
        };

        loadDivesFromFirebase();
    }, []);

    // Fügt neuen Tauchgang lokal zur Liste hinzu
    // Speichern in Firebase -> passiert beim Erstellen (Formular)
    const addDive = (dive: Dive) => {
        setDives((prev) => [...prev, dive]);
    };
    // Löscht den Tauchgang zuerst aus Firebase
    const deleteDive = async (id: string) => {
        await deleteDoc(doc(db, 'dives', id));
        // Dann auch lokal aus der Liste entfernt
        setDives((prev) => prev.filter((d) => d.id !== id));
    };

    // Aktualisiert Tauchgang in Firebase
    // Dann auch lokale Liste aktualisiert
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
        // Stellt Logbuchdaten & Funktionen allen Screens innerhalb der App bereit
        <DiveContext.Provider value={{ dives, addDive, deleteDive, updateDive }}>
            {children}
        </DiveContext.Provider>
    );
}

// RootLayout legt wichtigsten Screens der App fest
// DiveProvider umschließt Navigation -> alle Screens Zugriff auf das Logbuch
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
