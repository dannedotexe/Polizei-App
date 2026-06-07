import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import ChatScreen from './screens/ChatScreen';
import MapScreen from './screens/MapScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#25d366',
          tabBarInactiveTintColor: '#8c8c8c',
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            borderTopColor: '#2a2a2a',
            borderTopWidth: 1,
            height: 58,
            paddingBottom: 6,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#e8e8e8',
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 16, fontWeight: '700' },
        }}
      >
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerTitle: 'Sichtungen Bezirk Schärding',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Karte"
          component={MapScreen}
          options={{
            headerTitle: 'Karte',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
