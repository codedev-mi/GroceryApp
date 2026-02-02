import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Container from '../../../../components/Container';
import { categories } from '../../../../data/dummyData';

import { Category } from '@/types';

export default function Categories() {
  return (
    <Container>
      <FlatList
        data={categories}
        keyExtractor={(item: Category) => item.id}
        {...({ numColumns: 2 } as any)}
        columnWrapperStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Category }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/category/${item.id}`)}
          >
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 22,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
});
