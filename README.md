# DiveMate

Eine mobile App für Taucher – entwickelt mit React Native und Expo Go.

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
git clone https://github.com/JojoL2410/DiveMate_Project.git
cd diveMate_Project
```

### 2. Abhängigkeiten installieren

```bash
npm install
npx expo install expo-location geolib firebase
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
