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
        maxDepth: 171,
        monthlyTemps: {
            1: 5,  2: 5,  3: 6,  4: 8,
            5: 14, 6: 19, 7: 21, 8: 21,
            9: 19, 10: 15, 11: 11, 12: 8,
        },
    },
    {
        id: 'traunsee',
        name: 'Traunsee',
        lat: 47.87,
        lng: 13.80,
        maxDepth: 191,
        monthlyTemps: {
            1: 4,  2: 4,  3: 6,  4: 9,
            5: 13, 6: 18, 7: 20, 8: 20,
            9: 16, 10: 12, 11: 7, 12: 4,
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
            5: 12, 6: 17, 7: 19, 8: 19,
            9: 16, 10: 12, 11: 7, 12: 4,
        },
    },
    {
        id: 'mondsee',
        name: 'Mondsee',
        lat: 47.85,
        lng: 13.36,
        maxDepth: 68,
        monthlyTemps: {
            1: 4,  2: 4,  3: 5,  4: 8,
            5: 12, 6: 18, 7: 19, 8: 20,
            9: 16, 10: 12, 11: 7, 12: 4,
        },
    },
    {
        id: 'bodensee',
        name: 'Bodensee',
        lat: 47.59,
        lng: 9.73,
        maxDepth: 254,
        monthlyTemps: {
            1: 6,  2: 6,  3: 7,  4: 11,
            5: 15, 6: 20, 7: 23, 8: 22,
            9: 19, 10: 14, 11: 10, 12: 8,
        },
    },
    {
        id: 'erlaufsee',
        name: 'Erlaufsee',
        lat: 47.87,
        lng: 15.33,
        maxDepth: 38,
        monthlyTemps: {
            1: 3,  2: 3,  3: 7,  4: 8,
            5: 13, 6: 16, 7: 18, 8: 17,
            9: 13, 10: 10, 11: 6, 12: 3,
        },
    },
    {
        id: 'plansee',
        name: 'Plansee',
        lat: 47.47,
        lng: 10.75,
        maxDepth: 76,
        monthlyTemps: {
            1: 4,  2: 5,  3: 5,  4: 9,
            5: 10, 6: 14, 7: 15, 8: 15,
            9: 11, 10: 8, 11: 6, 12: 5,
        },
    },
    {
        id: 'weissensee',
        name: 'Weißensee',
        lat: 46.71,
        lng: 13.31,
        maxDepth: 99,
        monthlyTemps: {
            1: 4,  2: 4,  3: 6,  4: 8,
            5: 11, 6: 16, 7: 18, 8: 21,
            9: 14, 10: 11, 11: 8, 12: 4,
        },
    },
    {
        id: 'achensee',
        name: 'Achensee',
        lat: 47.52,
        lng: 11.71,
        maxDepth: 133,
        monthlyTemps: {
            1: 2,  2: 4,  3: 6,  4: 7,
            5: 10, 6: 13, 7: 15, 8: 17,
            9: 11, 10: 8, 11: 5, 12: 2,
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