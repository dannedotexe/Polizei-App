import { StatusBar } from 'expo-status-bar';
import { StyleSheet, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import { useRef, useEffect } from 'react';

export default function App() {
  const webRef = useRef<WebView>(null);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      webRef.current?.goBack();
      return true;
    });
    return () => sub.remove();
  }, []);

  return (
    <>
      <StatusBar style="light" hidden />
      <WebView
        ref={webRef}
        source={{ uri: 'https://dannedotexe.github.io/Polizei-App/' }}
        style={styles.webview}
        geolocationEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  webview: { flex: 1, backgroundColor: '#000' },
});
