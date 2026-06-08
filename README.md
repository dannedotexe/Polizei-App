# Sichtungen Bezirk Schärding – App

Eine React Native (Expo) App als Ersatz für die WhatsApp-Gruppe zur Standortverbreitung von Polizeistreifen.

## Features

- **Chat/Feed** – Sichtungen melden wie in einer WhatsApp-Gruppe
- **Karte** – Alle Sichtungen auf einer interaktiven Karte
- **Arten** – Unterscheidung zwischen Streife, Zivil, Radar
- **Live-Melden** – Neue Sichtung direkt aus der App posten

## Setup

```bash
npm install
npx expo start
```

## Tech Stack

- React Native + Expo (SDK 51)
- Expo Router (file-based navigation)
- react-native-maps (Kartenansicht)
- expo-location (GPS)
