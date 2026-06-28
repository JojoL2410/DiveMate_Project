// constants/lakes.ts
import { getDistance } from 'geolib';

export type Lake = {
    id: string;
    name: string;
    lat: number;
    lng: number;
    maxDepth: number;
    monthlyTemps: Record<number, number>;
};

export const LAKES: Lake[] = [
    {
        id: 'attersee',
        name: 'Attersee',
        lat: 47.91,
        lng: 13.54,
        maxDepth: 169,
        monthlyTemps: {
            1: 4,  2: 4,  3: 5,  4: 8,
            5: 13, 6: 18, 7: 21, 8: 22,
            9: 18, 10: 13, 11: 8, 12: 5,
        },
    },
    {
        id: 'traunsee',
        name: 'Traunsee',
        lat: 47.87,
        lng: 13.80,
        maxDepth: 191,
        monthlyTemps: {
            1: 4,  2: 4,  3: 5,  4: 7,
            5: 12, 6: 17, 7: 20, 8: 21,
            9: 17, 10: 12, 11: 7, 12: 5,
        },
    },
    {
        id: 'wolfgangsee',
        name: 'Wolfgangsee',
        lat: 47.74,
        lng: 13.45,
        maxDepth: 114,
        monthlyTemps: {
            1: 4,  2: 4,  3: 5,  4: 8,
            5: 12, 6: 17, 7: 20, 8: 21,
            9: 17, 10: 12, 11: 7, 12: 5,
        },
    },
    {
        id: 'mondsee',
        name: 'Mondsee',
        lat: 47.85,
        lng: 13.36,
        maxDepth: 68,
        monthlyTemps: {
            1: 4,  2: 5,  3: 6,  4: 9,
            5: 14, 6: 19, 7: 22, 8: 23,
            9: 19, 10: 13, 11: 8, 12: 5,
        },
    },
    {
        id: 'bodensee',
        name: 'Bodensee',
        lat: 47.59,
        lng: 9.73,
        maxDepth: 251,
        monthlyTemps: {
            1: 4,  2: 4,  3: 6,  4: 9,
            5: 13, 6: 17, 7: 20, 8: 21,
            9: 17, 10: 13, 11: 8, 12: 5,
        },
    },
    {
        id: 'erlaufsee',
        name: 'Erlaufsee',
        lat: 47.87,
        lng: 15.33,
        maxDepth: 38,
        monthlyTemps: {
            1: 3,  2: 3,  3: 5,  4: 8,
            5: 12, 6: 16, 7: 19, 8: 20,
            9: 16, 10: 11, 11: 6, 12: 4,
        },
    },
    {
        id: 'plansee',
        name: 'Plansee',
        lat: 47.47,
        lng: 10.81,
        maxDepth: 78,
        monthlyTemps: {
            1: 3,  2: 3,  3: 4,  4: 7,
            5: 11, 6: 15, 7: 18, 8: 19,
            9: 15, 10: 11, 11: 6, 12: 4,
        },
    },
    {
        id: 'weissensee',
        name: 'Weissensee',
        lat: 46.71,
        lng: 13.33,
        maxDepth: 99,
        monthlyTemps: {
            1: 3,  2: 3,  3: 4,  4: 8,
            5: 13, 6: 18, 7: 22, 8: 23,
            9: 18, 10: 12, 11: 7, 12: 4,
        },
    },
    {
        id: 'blindsee',
        name: 'Blindsee',
        lat: 47.36,
        lng: 10.84,
        maxDepth: 25,
        monthlyTemps: {
            1: 2,  2: 2,  3: 4,  4: 7,
            5: 11, 6: 15, 7: 18, 8: 19,
            9: 15, 10: 10, 11: 5, 12: 3,
        },
    },

    {
        id: 'achensee',
        name: 'Achensee',
        lat: 47.43,
        lng: 11.71,
        maxDepth: 133,
        monthlyTemps: {
            1: 3,  2: 3,  3: 4,  4: 7,
            5: 11, 6: 15, 7: 18, 8: 19,
            9: 15, 10: 11, 11: 6, 12: 4,
        },
    },
    {
        id: 'woerthersee',
        name: 'Wörthersee',
        lat: 46.62,
        lng: 14.15,
        maxDepth: 85,
        monthlyTemps: {
            1: 4,  2: 4,  3: 6,  4: 10,
            5: 16, 6: 21, 7: 24, 8: 25,
            9: 20, 10: 14, 11: 9, 12: 5,
        },
    },
    {
        id: 'grundlsee',
        name: 'Grundlsee',
        lat: 47.62,
        lng: 13.84,
        maxDepth: 64,
        monthlyTemps: {
            1: 3,  2: 3,  3: 5,  4: 8,
            5: 12, 6: 16, 7: 19, 8: 20,
            9: 16, 10: 11, 11: 6, 12: 4,
        },
    },
];

// ─── Hilfsfunktionen ─────────────────────────────────────────────────────────

const MAX_DISTANCE_METERS = 20_000; // 20 km Radius

/**
 * Sucht den nächsten See per geolib.
 * Gibt den See zurück wenn er innerhalb von 20 km liegt, sonst null.
 */
export function getNearestLakeIfClose(userLat: number, userLng: number): Lake | null {
    let nearest: Lake | null = null;
    let minDistance = Infinity;

    for (const lake of LAKES) {
        const dist = getDistance(
            { latitude: userLat, longitude: userLng },
            { latitude: lake.lat, longitude: lake.lng },
        );
        if (dist < minDistance) {
            minDistance = dist;
            nearest = lake;
        }
    }

    return minDistance <= MAX_DISTANCE_METERS ? nearest : null;
}

/**
 * Gibt die aktuelle Wassertemperatur basierend auf dem Monat zurück.
 */
export function getCurrentTemp(lake: Lake): number {
    const month = new Date().getMonth() + 1; // 1–12
    return lake.monthlyTemps[month] ?? 0;
}