import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { GROUP_INFO } from '@/constants/MockData';

function HeaderTitle() {
  return (
    <View style={styles.headerTitle}>
      <Text style={styles.headerGroupName}>{GROUP_INFO.name}</Text>
      <Text style={styles.headerMembers}>{GROUP_INFO.members} Mitglieder</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            borderTopColor: Colors.border,
            borderTopWidth: 1,
            height: 58,
            paddingBottom: 6,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: Colors.text,
          headerShadowVisible: false,
          headerTitle: () => <HeaderTitle />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Karte',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    alignItems: 'center',
  },
  headerGroupName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  headerMembers: {
    color: Colors.primary,
    fontSize: 12,
  },
});
