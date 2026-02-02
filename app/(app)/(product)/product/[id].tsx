import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { colors } from '@/colors';
import { products } from '@/data/dummyData';
import { addToCart } from '@/store/slices/cartSlice';
import { Product } from '@/types';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product: Product | undefined = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Mock data for realistic feel
  const rating = 4.8;
  const reviews = 124;
  const description = `Enjoy the premium quality of ${product.title}. Sourced from the best suppliers to ensure freshness and taste. Perfect for your daily needs and available at the best price.`;
  const deliveryTime = "15 mins";

  const handleAddToCart = () => {
    // Determine the quantity to add (implementation might need adjustment if logic changes)
    // currently cartSlice usually adds 1, so we might need to loop or update slice to accept quantity
    // For now, we dispatch once per quantity or just once if the store handles only unique items. 
    // Assuming simple add for this demo:
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.image }));
    }
    router.back();
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Image Area */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            contentFit="contain" // fit nicely
            transition={300}
          />
          {/* Header Controls Overlay */}
          <View style={styles.headerControls}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <Ionicons name="arrow-back" size={24} color={colors.neutral.text} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              style={styles.iconButton}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? colors.semantic.error : colors.neutral.text}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Sheet */}
        <View style={styles.contentSheet}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <View style={styles.badgeContainer}>
              <Text style={styles.categoryBadge}>{product.category}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.brand[700]} />
              <Text style={styles.ratingText}>{rating} ({reviews} reviews)</Text>
            </View>
          </View>

          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.currency}>₹</Text>
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.perUnit}>/ unit</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{description}</Text>

          {/* Delivery Info */}
          <View style={styles.deliveryContainer}>
            <View style={styles.deliveryItem}>
              <View style={styles.deliveryIconBg}>
                <MaterialsCommunityIcons name="clock-outline" size={24} color={colors.brand[900]} />
              </View>
              <View>
                <Text style={styles.deliveryLabel}>Delivery</Text>
                <Text style={styles.deliveryValue}>{deliveryTime}</Text>
              </View>
            </View>
            <View style={styles.deliveryItem}>
              <View style={styles.deliveryIconBg}>
                <MaterialsCommunityIcons name="shield-check-outline" size={24} color={colors.brand[900]} />
              </View>
              <View>
                <Text style={styles.deliveryLabel}>Quality</Text>
                <Text style={styles.deliveryValue}>100% Genuine</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={decrement} style={styles.qtyBtn}>
            <Ionicons name="remove" size={20} color={colors.neutral.text} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity onPress={increment} style={styles.qtyBtn}>
            <Ionicons name="add" size={20} color={colors.neutral.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add to Cart • ₹{product.price * quantity}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Helper for icons if MaterialCommunityIcons fails to load (optional fallback, but we import it)
const MaterialsCommunityIcons = (props: any) => <MaterialCommunityIcons {...props} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2', // Light grey background behind image
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: colors.neutral.text,
    marginBottom: 16,
  },
  backButton: {
    padding: 12,
    backgroundColor: colors.brand[700],
    borderRadius: 8,
  },
  backButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom bar
  },
  imageContainer: {
    height: 350,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40, // Status bar space
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  headerControls: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentSheet: {
    flex: 1,
    backgroundColor: colors.neutral.bg,
    marginTop: -40, // Overlap image
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: colors.neutral.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeContainer: {
    backgroundColor: colors.brand[300],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryBadge: {
    color: colors.brand[900],
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: colors.neutral.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.neutral.text,
    marginBottom: 8,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : undefined,
    lineHeight: 32,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  currency: {
    fontSize: 20,
    color: colors.brand[900],
    fontWeight: '600',
    marginRight: 4,
  },
  price: {
    fontSize: 32,
    color: colors.neutral.text, // Usually price is dark
    fontWeight: '900',
  },
  perUnit: {
    fontSize: 16,
    color: colors.neutral.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral.surface,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral.text,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: colors.neutral.textSecondary,
    lineHeight: 24,
  },
  deliveryContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 20,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.neutral.surface,
    padding: 12,
    borderRadius: 16,
    flex: 1,
  },
  deliveryIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brand[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryLabel: {
    fontSize: 12,
    color: colors.neutral.textSecondary,
  },
  deliveryValue: {
    fontSize: 14,
    color: colors.neutral.text,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.neutral.bg,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    borderRadius: 30,
    paddingHorizontal: 6,
    height: 56,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
    color: colors.neutral.text,
    minWidth: 20,
    textAlign: 'center',
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: colors.brand[700],
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.brand[700],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addToCartText: {
    color: '#000', // Black text on yellow is best for accessibility
    fontSize: 18,
    fontWeight: '700',
  },
});

