import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OTP() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verified</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/' as any)}
      >
        <Text style={styles.btnText}>Enter App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFD41D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  btnText: {
    fontWeight: '800',
  },
});
