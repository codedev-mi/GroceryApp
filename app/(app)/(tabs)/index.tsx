import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/colors';
import CategoryCard from '../../../components/CategoryCard';
import ProductItem from '../../../components/ProductItem';
import SearchBar from '../../../components/SearchBar';
import { categories, products } from '../../../data/dummyData';

const BANNERS = [
  {
    id: 1,
    title: "Fresh & Organic",
    subtitle: "Get 20% off on first order",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081986.png",
    bg: "#EFF9F0",
    btnColor: colors.brand[700]
  },
  {
    id: 2,
    title: "Flash Sale",
    subtitle: "Up to 50% off on Snacks",
    image: "https://cdn-icons-png.flaticon.com/512/2553/2553691.png",
    bg: "#FFF4E3",
    btnColor: "#FF9800"
  },
  {
    id: 3,
    title: "Mega Deal",
    subtitle: "Buy 1 Get 1 Free on Oils",
    image: "https://cdn-icons-png.flaticon.com/512/2829/2829824.png",
    bg: "#E3F2FD",
    btnColor: "#2196F3"
  }
];

export default function Home() {
  const router = useRouter();
  const bannerRef = useRef<ScrollView>(null);
  const [activeBanner, setActiveBanner] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => {
        const nextIndex = (prev + 1) % BANNERS.length;
        // Calculate offset: Width (300) + gap (16) = 316
        // Initial padding is 20, but snapToInterval handles relative snapping.
        // Usually plain scrollTo works best with a calculated x.
        // We'll trust the calculated offset.
        bannerRef.current?.scrollTo({
          x: nextIndex * 316,
          animated: true
        });
        return nextIndex;
      });
    }, 5000); // 5 second auto-slide as requested.
    // User explicitly asked for 1sec.

    return () => clearInterval(interval);
  }, []);

  // Use a second effect to reset interval if user manually scrolls? 
  // For simplicity MVP: just strict interval.

  // Mock location
  const location = "Home - 123, Green Street, New York";

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <View style={styles.locationIconBg}>
            <Ionicons name="location-sharp" size={24} color={colors.brand[700]} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.deliveryTo}>Home</Text>
              <Ionicons name="chevron-down" size={16} color="#111" style={{ marginLeft: 4, marginTop: 2 }} />
            </View>
            <Text style={styles.locationText} numberOfLines={1}>123, Green Street, New York, USA</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => router.push('/wishlist')}>
            <Ionicons name="heart-outline" size={26} color="#1F2937" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar onSearch={(t) => console.log(t)} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Banner Slider */}
        <View style={styles.bannerContainer}>
          <ScrollView
            ref={bannerRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannerScroll}
            decelerationRate="fast"
            snapToInterval={316} // Width (300) + gap (16)
            snapToAlignment="start"
            onMomentumScrollEnd={(ev) => {
              // Update active index if user manually scrolls
              const newIndex = Math.round(ev.nativeEvent.contentOffset.x / 316);
              setActiveBanner(newIndex);
            }}
          >
            {BANNERS.map((banner) => (
              <View key={banner.id} style={[styles.banner, { backgroundColor: banner.bg }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                  <TouchableOpacity style={[styles.bannerBtn, { backgroundColor: banner.btnColor }]}>
                    <Text style={styles.bannerBtnText}>Order Now</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: banner.image }}
                  style={styles.bannerImage}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
            {categories.map((cat) => (
              <View key={cat.id} style={styles.catItem}>
                <CategoryCard category={cat} onPress={() => router.push(`/categories/category/${cat.id}` as any)} />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  locationIconBg: {
    marginRight: 8,
    // Removed contrast circle, just the icon looks cleaner typically or simple bg
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9E6', // Very light brand yellow
    borderRadius: 8,
  },
  deliveryTo: {
    fontSize: 16, // Larger title
    color: '#111',
    fontWeight: '800', // Bold for "Home"
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 1,
  },
  profileBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    borderWidth: 1, // Thinner border
    borderColor: '#E5E7EB',
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
  bannerContainer: {
    marginBottom: 24,
  },
  bannerScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  banner: {
    width: 300,
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
    width: 100,
  }
});
