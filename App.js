import React from 'react';
import { Linking, Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import html from './appHtml';

const EXTERNAL = /^(https?:|tel:|sms:|mailto:|whatsapp:|intent:)/i;

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <StatusBar style="light" />
        <View style={styles.root}>
          <WebView
            originWhitelist={['*']}
            source={{ html, baseUrl: 'https://lending.local/' }}
            javaScriptEnabled
            domStorageEnabled
            allowFileAccess
            setSupportMultipleWindows={false}
            onShouldStartLoadWithRequest={(req) => {
              if (EXTERNAL.test(req.url)) {
                Linking.openURL(req.url).catch(() => {});
                return false;
              }
              return true;
            }}
            onOpenWindow={(e) => Linking.openURL(e.nativeEvent.targetUrl).catch(() => {})}
            style={styles.root}
            {...(Platform.OS === 'ios' ? { bounces: false } : {})}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: '#0F2440' } });
