// constants/lakes.ts

export type Lake = {
    id: string;
    name: string;
    lat: number;
    lng: number;
    monthlyTemps: Record<number, number>;
};

export const LAKES: Lake[] = [
    {
        id: 'attersee',
        name: 'Attersee',
        lat: 47.91,
        lng: 13.54,
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
        monthlyTemps: {
            1: 3,  2: 3,  3: 5,  4: 8,
            5: 12, 6: 16, 7: 19, 8: 20,
            9: 16, 10: 11, 11: 6, 12: 4,
        },
    },
    {
        id: 'ybbs',
        name: 'Ybbs',
        lat: 48.00,
        lng: 15.08,
        monthlyTemps: {
            1: 2,  2: 3,  3: 6,  4: 9,
            5: 13, 6: 17, 7: 19, 8: 19,
            9: 15, 10: 10, 11: 5, 12: 3,
        },
    },
    {
        id: 'enns',
        name: 'Enns',
        lat: 47.95,
        lng: 14.47,
        monthlyTemps: {
            1: 2,  2: 3,  3: 6,  4: 9,
            5: 13, 6: 17, 7: 19, 8: 19,
            9: 15, 10: 10, 11: 5, 12: 3,
        },
    },
    {
        id: 'donau',
        name: 'Donau',
        lat: 48.20,
        lng: 15.63,
        monthlyTemps: {
            1: 3,  2: 4,  3: 7,  4: 11,
            5: 15, 6: 19, 7: 22, 8: 22,
            9: 18, 10: 13, 11: 7, 12: 4,
        },
    },
];

// Gibt die aktuelle Wassertemperatur für einen See zurück
export function getCurrentTemp(lake: Lake): number {
    const month = new Date().getMonth() + 1;
    return lake.monthlyTemps[month];
}

