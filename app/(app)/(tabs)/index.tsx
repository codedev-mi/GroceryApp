import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/colors';
import CategoryCard from '../../../components/CategoryCard';
import ProductItem from '../../../components/ProductItem';
import SearchBar from '../../../components/SearchBar';
import { categories, products } from '../../../data/dummyData';

export default function Home() {
  const router = useRouter();

  // Mock location
  const location = "Home - 123, Green Street, New York";

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <View style={styles.locationIconBg}>
            <Ionicons name="location" size={18} color={colors.brand[700]} />
          </View>
          <View>
            <Text style={styles.deliveryTo}>Delivery to</Text>
            <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.profileImg}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar onSearch={(t) => console.log(t)} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Banner (Optional) */}
        <View style={styles.banner}>
          <View>
            <Text style={styles.bannerTitle}>Fresh & Organic</Text>
            <Text style={styles.bannerSubtitle}>Get 20% off on first order</Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Order Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png' }}
            style={styles.bannerImage}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
            {categories.map((cat) => (
              <View key={cat.id} style={styles.catItem}>
                <CategoryCard category={cat} onPress={() => { }} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Popular Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Near You</Text>
          <View style={{ paddingHorizontal: 20 }}>
            {products.map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  locationIconBg: {
    width: 36,
    height: 36,
    backgroundColor: '#F2F2F2',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  deliveryTo: {
    fontSize: 12,
    color: colors.neutral.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  locationText: {
    fontSize: 14,
    color: colors.neutral.text,
    fontWeight: '700',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.brand[500],
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  banner: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#EFF9F0', // Soft green/yellow hint
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  bannerBtn: {
    backgroundColor: colors.brand[700],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    fontWeight: '700',
    color: '#000',
    fontSize: 12,
  },
  bannerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral.text,
    marginLeft: 20,
    marginBottom: 16,
  },
  catScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  catItem: {
    width: 90,
  }
});
