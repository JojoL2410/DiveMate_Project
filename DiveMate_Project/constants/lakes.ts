// constants/lakes.ts
// Enthält Typ & Hilfsfunktionen für Tauchseen

// getDistance berechnet Entfernung zwischen 2 GPS-Koordinaten
import { getDistance } from 'geolib';

// Beschreibt, welche Daten ein See besitzt
export type Lake = {
    id: string;
    name: string;
    lat: number; // Breitengrad
    lng: number; // Längengrad
    maxDepth: number;
    monthlyTemps: Record<number, number>; // Durchschnittliche Wassertemperatur/ Monat
};

// Maximale Entfernung für GPS-Suche
const MAX_DISTANCE_METERS = 20_000; // 20 km Radius

/**
* Sucht den nächsten See per geolib
* Gibt den See zurück wenn er innerhalb von 20 km liegt, sonst null
*/
export function getNearestLakeIfClose(userLat: number, userLng: number): Lake | null {
    // Speichert bisher nächst gefundenen See
    let nearest: Lake | null = null;
    // Speichert die kleinste bisher gefundene Entfernung
    let minDistance = Infinity;

    // Geht alle bekannten Seen durch & berechnet jeweils die Entfernung
    for (const lake of LAKES) {
        const dist = getDistance(
            { latitude: userLat, longitude: userLng },
            { latitude: lake.lat, longitude: lake.lng },
        );
        // Wenn See näher ist als alle vorherigen, wird er gespeichert
        if (dist < minDistance) {
            minDistance = dist;
            nearest = lake;
        }
    }

    // Nur wenn nächste See mx 20 km entfernt ist -> wird zurueckgegeben
    return minDistance <= MAX_DISTANCE_METERS ? nearest : null;
}

/**
 * Gibt die aktuelle Wassertemperatur basierend auf dem Monat zurück
 */
export function getCurrentTemp(lake: Lake): number {
    const month = new Date().getMonth() + 1; // sonst 0-11 (deswegen +1)
    return lake.monthlyTemps[month] ?? 0;
}