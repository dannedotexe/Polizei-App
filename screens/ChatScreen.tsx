import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_SIGHTINGS, PATROL_TYPE_LABELS, PATROL_TYPE_COLORS, PatrolType, Sighting } from '../constants/MockData';

const MY_NAME = 'Ich';
const patrolTypes: PatrolType[] = ['dienst', 'zivil', 'radar', 'unbekannt'];

function stringToColor(str: string): string {
  const colors = ['#128c7e', '#075e54', '#25d366', '#1a6bcc', '#9c27b0', '#e91e63', '#ff5722'];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function ChatScreen() {
  const [sightings, setSightings] = useState<Sighting[]>(MOCK_SIGHTINGS);
  const [message, setMessage] = useState('');
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [selectedType, setSelectedType] = useState<PatrolType>('dienst');

  function sendMessage() {
    if (!message.trim()) return;
    const newSighting: Sighting = {
      id: Date.now().toString(),
      username: MY_NAME,
      message: message.trim(),
      area: 'Schärding',
      patrolType: selectedType,
      latitude: 48.4539,
      longitude: 13.4347,
      timestamp: new Date(),
      timeLabel: new Date().toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' }),
    };
    setSightings([newSighting, ...sightings]);
    setMessage('');
  }

  function renderItem({ item }: { item: Sighting }) {
    const isMe = item.username === MY_NAME;
    const typeColor = PATROL_TYPE_COLORS[item.patrolType];

    return (
      <View style={[styles.bubbleRow, isMe && styles.bubbleRowMe]}>
        {!isMe && (
          <View style={[styles.avatar, { backgroundColor: stringToColor(item.username) }]}>
            <Text style={styles.avatarText}>{item.username[0].toUpperCase()}</Text>
          </View>
        )}
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          {!isMe && <Text style={styles.bubbleUsername}>{item.username}</Text>}
          <Text style={styles.bubbleText}>{item.message}</Text>
          <View style={styles.bubbleFooter}>
            <View style={[styles.typeBadge, { backgroundColor: typeColor + '33' }]}>
              <View style={[styles.typeDot, { backgroundColor: typeColor }]} />
              <Text style={[styles.typeLabel, { color: typeColor }]}>
                {PATROL_TYPE_LABELS[item.patrolType]}
              </Text>
            </View>
            <Text style={styles.bubbleTime}>{item.timeLabel}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={sightings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        inverted
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputBar}>
        <TouchableOpacity
          style={[styles.typeButton, { borderColor: PATROL_TYPE_COLORS[selectedType] }]}
          onPress={() => setShowTypeModal(true)}
        >
          <View style={[styles.typeDot, { backgroundColor: PATROL_TYPE_COLORS[selectedType] }]} />
          <Text style={[styles.typeButtonText, { color: PATROL_TYPE_COLORS[selectedType] }]}>
            {PATROL_TYPE_LABELS[selectedType]}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Sichtung melden..."
          placeholderTextColor="#8c8c8c"
          multiline
          maxLength={200}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal visible={showTypeModal} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowTypeModal(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Art der Sichtung</Text>
            {patrolTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.modalOption, selectedType === type && styles.modalOptionActive]}
                onPress={() => { setSelectedType(type); setShowTypeModal(false); }}
              >
                <View style={[styles.typeDot, { backgroundColor: PATROL_TYPE_COLORS[type] }]} />
                <Text style={styles.modalOptionText}>{PATROL_TYPE_LABELS[type]}</Text>
                {selectedType === type && <Ionicons name="checkmark" size={18} color="#25d366" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117' },
  list: { padding: 12, paddingBottom: 4 },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10, gap: 8 },
  bubbleRowMe: { flexDirection: 'row-reverse' },
  avatar: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  bubble: { maxWidth: '78%', borderRadius: 12, padding: 10, paddingBottom: 6 },
  bubbleMe: { backgroundColor: '#1f3a2e', borderBottomRightRadius: 3 },
  bubbleOther: { backgroundColor: '#1e1e1e', borderBottomLeftRadius: 3 },
  bubbleUsername: { color: '#25d366', fontSize: 13, fontWeight: '700', marginBottom: 3 },
  bubbleText: { color: '#e8e8e8', fontSize: 15, lineHeight: 20 },
  bubbleFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5, gap: 8 },
  typeBadge: { flexDirection: 'row', alignItems: 'center', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, gap: 4 },
  typeDot: { width: 7, height: 7, borderRadius: 4 },
  typeLabel: { fontSize: 11, fontWeight: '600' },
  bubbleTime: { color: '#8c8c8c', fontSize: 11, marginLeft: 'auto' },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#1a1a1a', padding: 8, gap: 8, borderTopWidth: 1, borderTopColor: '#2a2a2a' },
  typeButton: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, borderWidth: 1.5, paddingHorizontal: 8, paddingVertical: 6, gap: 5, marginBottom: 2 },
  typeButtonText: { fontSize: 12, fontWeight: '700' },
  input: { flex: 1, backgroundColor: '#2a2a2a', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9, color: '#e8e8e8', fontSize: 15, maxHeight: 100 },
  sendButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#25d366', alignItems: 'center', justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#1e1e1e', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, paddingBottom: 36 },
  modalTitle: { color: '#e8e8e8', fontSize: 16, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  modalOption: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 12, borderRadius: 10 },
  modalOptionActive: { backgroundColor: '#2a2a2a' },
  modalOptionText: { flex: 1, color: '#e8e8e8', fontSize: 16 },
});
