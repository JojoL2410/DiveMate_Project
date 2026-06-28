# DiveLog

Eine mobile App für Taucher – entwickelt mit React Native und Expo Go.  
DiveLog ermöglicht das Erfassen, Verwalten und Analysieren von Tauchgängen sowie die Anzeige von Wetterdaten und Wassertemperaturen für österreichische Seen.

---

## Features

- **Logbuch** – Tauchgänge erfassen, bearbeiten und löschen
- **Wetter** – Aktuelle Wetterdaten via Open-Meteo API (Lufttemperatur, Wind, Wellenhöhe)
- **Wassertemperatur** – GPS-basierte Seenerkennung mit saisonalen Durchschnittswerten
- **Ausrüstung** – Interaktive Checkliste vor dem Tauchgang
- **Buddy-Check** – 5-Schritte-Prozess mit Fortschrittsanzeige
- **Statistiken** – Durchschnittliche Tauchtiefe, Dauer und Anzahl der Tauchgänge

---

## Technologie-Stack

| Technologie | Version |
|---|---|
| React Native | 0.81.5 |
| Expo SDK | 52 |
| Expo Router | 4.x |
| TypeScript | 5.x |
| expo-location | ~17.x |
| geolib | ~3.x |

---

## Voraussetzungen

Folgende Tools müssen installiert sein:

- [Node.js](https://nodejs.org/) **>= 20.19.4**
- [npm](https://www.npmjs.com/) oder [yarn](https://yarnpkg.com/)
- [Expo Go App](https://expo.dev/go) auf dem Smartphone (iOS oder Android)
- [Git](https://git-scm.com/)

Optional für die Entwicklung:
- [WebStorm](https://www.jetbrains.com/webstorm/) oder [VS Code](https://code.visualstudio.com/)

---

## Installation & Inbetriebnahme

### 1. Repository klonen

```bash
git clone https://github.com/DEIN-USERNAME/divelog.git
cd divelog
```

### 2. Abhängigkeiten installieren

```bash
npm install
npx expo install expo-location geolib
```

> `npx expo install` wird empfohlen, damit Expo automatisch die zur SDK-Version passenden Paketversionen wählt.

### 3. App starten

```bash
npx expo start
```

Im Terminal erscheint ein QR-Code.

### 4. App auf dem Smartphone öffnen

**iOS:**
1. Kamera-App öffnen
2. QR-Code scannen
3. Link zu Expo Go öffnen

**Android:**
1. Expo Go App öffnen
2. „Scan QR Code" tippen
3. QR-Code scannen

> Smartphone und Computer müssen im selben WLAN sein.

---

## Projektstruktur

```
divelog/
├── app/
│   ├── _layout.tsx          # Root-Layout, Navigation & DiveContext
│   ├── modal.tsx            # Tauchgang erfassen
│   ├── wetter.tsx           # Wetter-Detailansicht
│   ├── details/
│   │   ├── diveDetails.tsx  # Tauchgang-Detailseite
│   │   └── diveEdit.tsx     # Tauchgang bearbeiten
│   └── (tabs)/
│       ├── _layout.tsx      # Tab-Navigation
│       ├── index.tsx        # Home-Screen
│       ├── wetter.tsx       # Tauchplatz-Auswahl
│       ├── ausruestung.tsx  # Ausrüstungs-Checkliste
│       ├── buddy.tsx        # Buddy-Check
│       ├── logbuch.tsx      # Logbuch
│       └── styles/          # Screen-spezifische Styles
├── constants/
│   ├── theme.ts             # Farben & Design-Token
│   └── lakes.ts             # Seen-Datenbank & GPS-Logik
├── styles/                  # Globale Styles
└── components/
    └── ui/
        └── ScreenHeader.tsx # Wiederverwendbarer Header
```

---

## Seen-Datenbank

Die App enthält saisonale Wassertemperatur-Durchschnittswerte für folgende Gewässer:

| See | Bundesland | Max. Tiefe |
|---|---|---|
| Attersee | Oberösterreich | 171 m |
| Traunsee | Oberösterreich | 191 m |
| Wolfgangsee | Oberösterreich/Salzburg | 114 m |
| Mondsee | Oberösterreich | 68 m |
| Bodensee | Vorarlberg | 254 m |
| Erlaufsee | Niederösterreich | 38 m |
| Plansee | Tirol | 76 m |
| Weißensee | Kärnten | 99 m |
| Achensee | Tirol | 133 m |

Die Wassertemperaturen basieren auf offiziellen Messdaten des [Hydrografischen Dienstes Österreich](https://ehyd.gv.at) sowie [SeaTemperature.info](https://seatemperature.info).

---

## Wetter-API

Die App verwendet die kostenlose [Open-Meteo API](https://open-meteo.com):

- **Forecast API** – Lufttemperatur & Wind
- **Marine API** – Wellenhöhe

Kein API-Key erforderlich.

---

## GPS-Berechtigungen

Die App benötigt GPS-Zugriff für:
- Automatische Erkennung des nächsten Sees (Radius: 25 km)
- Standortanzeige im Home-Screen

Die Berechtigung wird beim ersten Start der Wetter- und Home-Ansicht abgefragt.

---

## Bekannte Einschränkungen

- Daten werden **nicht persistent gespeichert** – beim App-Neustart werden die Beispieldaten neu geladen
- Wassertemperaturen sind **saisonale Durchschnittswerte**, keine Echtzeit-Messdaten
- Wetterdaten erfordern eine **aktive Internetverbindung**

---

## Entwicklung

Entwickelt im Rahmen einer Lehrveranstaltung mit:

- React Native & Expo Go
- TypeScript
- Expo Router (File-based Navigation)
- WebStorm

---

## Lizenz

Dieses Projekt wurde zu Bildungszwecken erstellt.