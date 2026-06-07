import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_SIGHTINGS, PATROL_TYPE_COLORS, PATROL_TYPE_LABELS, Sighting } from '../constants/MockData';

function minutesAgo(s: Sighting): number {
  return Math.floor((Date.now() - s.timestamp.getTime()) / 60000);
}

function ageLabel(mins: number): string {
  if (mins < 60) return `vor ${mins} Min.`;
  return `vor ${Math.floor(mins / 60)} Std.`;
}

export default function MapScreen() {
  const [selected, setSelected] = useState<Sighting | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map-outline" size={48} color="#444" />
        <Text style={styles.mapTitle}>Karte – Bezirk Schärding</Text>
        <Text style={styles.mapSub}>{MOCK_SIGHTINGS.length} aktive Sichtungen</Text>
      </View>

      <View style={styles.legend}>
        {(['dienst', 'zivil', 'radar'] as const).map((type) => (
          <View key={type} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: PATROL_TYPE_COLORS[type] }]} />
            <Text style={styles.legendText}>{PATROL_TYPE_LABELS[type]}</Text>
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.listTitle}>Alle Sichtungen</Text>
        {MOCK_SIGHTINGS.map((s) => {
          const mins = minutesAgo(s);
          const color = PATROL_TYPE_COLORS[s.patrolType];
          const isSelected = selected?.id === s.id;
          return (
            <TouchableOpacity
              key={s.id}
              style={[styles.card, { borderLeftColor: color }, isSelected && styles.cardSelected]}
              onPress={() => setSelected(isSelected ? null : s)}
            >
              <View style={styles.cardRow}>
                <View style={[styles.dot, { backgroundColor: color }]} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardUser}>{s.username}</Text>
                  <Text style={styles.cardMsg}>{s.message}</Text>
                </View>
                <View style={styles.cardRight}>
                  <Text style={styles.cardTime}>{ageLabel(mins)}</Text>
                  <Text style={[styles.cardType, { color }]}>{PATROL_TYPE_LABELS[s.patrolType]}</Text>
                </View>
              </View>
              {isSelected && (
                <View style={styles.cardDetail}>
                  <Ionicons name="location-outline" size={14} color="#8c8c8c" />
                  <Text style={styles.cardArea}>{s.area}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  mapPlaceholder: { height: 180, backgroundColor: '#1a1a1a', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#333', gap: 8 },
  mapTitle: { color: '#888', fontSize: 16, fontWeight: '600' },
  mapSub: { color: '#555', fontSize: 13 },
  legend: { flexDirection: 'row', gap: 16, padding: 12, backgroundColor: '#1a1a1a', borderBottomWidth: 1, borderBottomColor: '#333' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { color: '#8c8c8c', fontSize: 12, fontWeight: '600' },
  list: { padding: 12, gap: 8, paddingBottom: 24 },
  listTitle: { color: '#8c8c8c', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  card: { backgroundColor: '#1e1e1e', borderRadius: 10, padding: 12, borderLeftWidth: 3, borderWidth: 1, borderColor: '#333', marginBottom: 8 },
  cardSelected: { backgroundColor: '#262626', borderColor: '#25d366' },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardInfo: { flex: 1 },
  cardUser: { color: '#e8e8e8', fontSize: 14, fontWeight: '700' },
  cardMsg: { color: '#8c8c8c', fontSize: 13, marginTop: 2 },
  cardRight: { alignItems: 'flex-end', gap: 4 },
  cardTime: { color: '#8c8c8c', fontSize: 11 },
  cardType: { fontSize: 11, fontWeight: '700' },
  cardDetail: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  cardArea: { color: '#8c8c8c', fontSize: 12 },
});
