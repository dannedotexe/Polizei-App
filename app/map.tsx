import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useState, useRef } from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import {
  MOCK_SIGHTINGS,
  PATROL_TYPE_COLORS,
  PATROL_TYPE_LABELS,
  Sighting,
} from '@/constants/MockData';

const INITIAL_REGION: Region = {
  latitude: 48.4539,
  longitude: 13.4347,
  latitudeDelta: 0.35,
  longitudeDelta: 0.35,
};

function minutesAgo(sighting: Sighting): number {
  return Math.floor((Date.now() - sighting.timestamp.getTime()) / 60000);
}

function ageLabel(mins: number): string {
  if (mins < 60) return `vor ${mins} Min.`;
  const h = Math.floor(mins / 60);
  return `vor ${h} Std.`;
}

export default function MapScreen() {
  const [selected, setSelected] = useState<Sighting | null>(null);
  const mapRef = useRef<MapView>(null);

  function flyTo(sighting: Sighting) {
    mapRef.current?.animateToRegion(
      {
        latitude: sighting.latitude,
        longitude: sighting.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      400
    );
    setSelected(sighting);
  }

  function resetView() {
    mapRef.current?.animateToRegion(INITIAL_REGION, 400);
    setSelected(null);
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={INITIAL_REGION}
        mapType="standard"
        userInterfaceStyle="dark"
        showsUserLocation
        showsCompass
        showsScale
      >
        {MOCK_SIGHTINGS.map((sighting) => {
          const mins = minutesAgo(sighting);
          const opacity = Math.max(0.4, 1 - mins / 200);
          const color = PATROL_TYPE_COLORS[sighting.patrolType];

          return (
            <Marker
              key={sighting.id}
              coordinate={{ latitude: sighting.latitude, longitude: sighting.longitude }}
              onPress={() => setSelected(sighting)}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={[styles.markerOuter, { borderColor: color, opacity }]}>
                <View style={[styles.markerInner, { backgroundColor: color }]}>
                  <Ionicons
                    name={
                      sighting.patrolType === 'radar'
                        ? 'speedometer'
                        : sighting.patrolType === 'zivil'
                        ? 'car'
                        : 'shield'
                    }
                    size={13}
                    color="#fff"
                  />
                </View>
              </View>
              <Callout tooltip>
                <View style={styles.callout}>
                  <Text style={styles.calloutName}>{sighting.username}</Text>
                  <Text style={styles.calloutMsg}>{sighting.message}</Text>
                  <Text style={styles.calloutTime}>{ageLabel(mins)}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        {(['dienst', 'zivil', 'radar'] as const).map((type) => (
          <View key={type} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: PATROL_TYPE_COLORS[type] }]} />
            <Text style={styles.legendText}>{PATROL_TYPE_LABELS[type]}</Text>
          </View>
        ))}
      </View>

      {/* Reset button */}
      {selected && (
        <TouchableOpacity style={styles.resetBtn} onPress={resetView}>
          <Ionicons name="contract" size={18} color={Colors.text} />
        </TouchableOpacity>
      )}

      {/* Bottom Sheet: Sightings List */}
      <View style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <Text style={styles.sheetTitle}>
          Sichtungen ({MOCK_SIGHTINGS.length})
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
          {MOCK_SIGHTINGS.map((s) => {
            const mins = minutesAgo(s);
            const color = PATROL_TYPE_COLORS[s.patrolType];
            const isSelected = selected?.id === s.id;
            return (
              <TouchableOpacity
                key={s.id}
                style={[styles.card, isSelected && styles.cardSelected, { borderLeftColor: color }]}
                onPress={() => flyTo(s)}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardUser} numberOfLines={1}>
                    {s.username}
                  </Text>
                  <Text style={styles.cardTime}>{ageLabel(mins)}</Text>
                </View>
                <Text style={styles.cardMsg} numberOfLines={2}>
                  {s.message}
                </Text>
                <View style={styles.cardFooter}>
                  <View style={[styles.cardTypeDot, { backgroundColor: color }]} />
                  <Text style={[styles.cardType, { color }]}>{PATROL_TYPE_LABELS[s.patrolType]}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  markerOuter: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callout: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
    maxWidth: 200,
    borderWidth: 1,
    borderColor: '#333',
  },
  calloutName: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 3,
  },
  calloutMsg: {
    color: Colors.text,
    fontSize: 13,
    marginBottom: 4,
  },
  calloutTime: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  legend: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.mapOverlay,
    borderRadius: 10,
    padding: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  resetBtn: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.mapOverlay,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.mapOverlay,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#444',
    alignSelf: 'center',
    marginBottom: 10,
  },
  sheetTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardScroll: {
    paddingLeft: 12,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 12,
    width: 180,
    marginRight: 10,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardSelected: {
    backgroundColor: '#262626',
    borderColor: Colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardUser: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    marginRight: 4,
  },
  cardTime: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  cardMsg: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardType: {
    fontSize: 11,
    fontWeight: '700',
  },
});
