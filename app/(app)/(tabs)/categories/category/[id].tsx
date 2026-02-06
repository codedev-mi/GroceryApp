import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/colors';
import { Product } from '@/types';
import ProductGridItem from '../../../../../components/ProductGridItem';
import { categories, products } from '../../../../../data/dummyData';

const SIDEBAR_WIDTH = 90;

export default function CategoryProducts() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Find current category data
  const categoryData = categories.find(c => c.id === id);
  const subCategories = categoryData?.subCategories || [];

  // State
  const [selectedSubCat, setSelectedSubCat] = useState<string>('All');

  // Reset selection when category changes
  useEffect(() => {
    setSelectedSubCat('All');
  }, [id]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Must match main category
      if (p.category !== id && p.category !== categoryData?.title) return false;

      // 2. Filter by subcategory if not 'All'
      if (subCategories.length > 0 && selectedSubCat !== 'All') {
        return p.subCategoryId === selectedSubCat;
      }
      return true;
    });
  }, [id, selectedSubCat, subCategories, categoryData]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)' as any);
    }
  };

  const handleCategoryPress = (catId: string) => {
    if (catId === id) return;
    router.replace(`/categories/category/${catId}` as any);
  };

  // Layout Props
  const contentWidth = width - SIDEBAR_WIDTH;
  const cardWidth = (contentWidth - 32) / 2;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{categoryData?.title || 'Categories'}</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        {/* Left Sidebar (All Categories) */}
        <View style={styles.sidebar}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sidebarContent}
          >
            {categories.map((cat) => {
              const isSelected = cat.id === id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => handleCategoryPress(cat.id)}
                  style={[styles.sidebarItem, isSelected && styles.sidebarItemSelected]}
                >
                  <View style={[styles.sidebarIconContainer, isSelected && styles.sidebarIconSelected]}>
                    <Image source={{ uri: cat.image }} style={styles.sidebarImage} contentFit="contain" />
                  </View>
                  <Text style={[styles.sidebarText, isSelected && styles.sidebarTextSelected]}>
                    {cat.title}
                  </Text>
                  {isSelected && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Right Content */}
        <View style={styles.content}>
          {/* Subcategories Horizontal List */}
          {subCategories.length > 0 && (
            <View style={styles.subCatContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}>
                <TouchableOpacity
                  onPress={() => setSelectedSubCat('All')}
                  style={[styles.subCatChip, selectedSubCat === 'All' && styles.subCatChipSelected]}
                >
                  <Text style={[styles.subCatChipText, selectedSubCat === 'All' && styles.subCatChipTextSelected]}>All</Text>
                </TouchableOpacity>
                {subCategories.map(sub => (
                  <TouchableOpacity
                    key={sub.id}
                    onPress={() => setSelectedSubCat(sub.id)}
                    style={[styles.subCatChip, selectedSubCat === sub.id && styles.subCatChipSelected]}
                  >
                    <Text style={[styles.subCatChipText, selectedSubCat === sub.id && styles.subCatChipTextSelected]}>{sub.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Products Header Text */}
          <View style={styles.productsHeader}>
            <Text style={styles.subCatTitleDisplay}>
              {selectedSubCat === 'All' ? `${categoryData?.title} All` : subCategories.find(s => s.id === selectedSubCat)?.title}
            </Text>
            <Text style={styles.productsCount}>{filteredProducts.length} items</Text>
          </View>

          <FlatList
            data={filteredProducts}
            keyExtractor={(item: Product) => item.id.toString()}
            renderItem={({ item }: { item: Product }) => (
              <ProductGridItem
                product={item}
                customWidth={cardWidth}
              />
            )}
            showsVerticalScrollIndicator={false}
            {...({ numColumns: 2 } as any)}
            key={id} // Force re-render on category change
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 4 }}
            contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png" }}
                  style={{ width: 60, height: 60, opacity: 0.5, marginBottom: 10 }}
                />
                <Text style={styles.emptyText}>No items found.</Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 56, // Slightly taller
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
    elevation: 2, // Slight shadow for header
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    textTransform: 'capitalize',
    flex: 1,
    marginLeft: 8,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  // Sidebar
  subCatContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  subCatChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  subCatChipSelected: {
    backgroundColor: '#E8F5E9', // Light green bg
    borderColor: colors.brand[700],
  },
  subCatChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  subCatChipTextSelected: {
    color: colors.brand[700],
    fontWeight: '700',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: '#F7F8FA', // Light gray background for sidebar
    borderRightWidth: 0,
  },
  sidebarContent: {
    paddingVertical: 0,
    paddingBottom: 40,
  },
  sidebarItem: {
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  sidebarItemSelected: {
    backgroundColor: '#FFF', // White when selected to blend
    borderRightWidth: 0,
  },
  sidebarIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12, // Softer radius
    backgroundColor: '#FFF', // Icons on white circles in sidebar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  sidebarIconSelected: {
    backgroundColor: '#FFF1A8', // Light brand color bg
    borderColor: colors.brand[700],
  },
  sidebarImage: {
    width: 28,
    height: 28,
  },
  sidebarText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#6B7280',
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  sidebarTextSelected: {
    color: '#111',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.brand[700],
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  // Content
  content: {
    flex: 1,
    backgroundColor: '#FFF', // White content background
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    // borderBottomWidth: 1, // Removed to avoid double borders with chips
    // borderBottomColor: '#F0F0F0',
  },
  subCatTitleDisplay: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
  },
  productsCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  }
});
