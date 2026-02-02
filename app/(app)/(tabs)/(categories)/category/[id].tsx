import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Container from '../../../../../components/Container';
import ProductItem from '../../../../../components/ProductItem';
import { products } from '../../../../../data/dummyData';

import { Product } from '@/types';

export default function CategoryProducts() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const filtered = products.filter(p => p.category === id);

  return (
    <Container>
      <Text style={styles.heading}>Category</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item: Product) => item.id.toString()}
        renderItem={({ item }: { item: Product }) => <ProductItem product={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
});
