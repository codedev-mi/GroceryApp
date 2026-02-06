import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '@/colors';
import { RootState } from '../store';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { Product } from '../types';

export default function ProductItem({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(i => i.id === product.id)
  );

  const isInWishlist = useSelector((state: RootState) =>
    state.wishlist.items.some(i => i.id === product.id)
  );

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAdd = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.card}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={200}
        />
        {/* Wishlist Button - Absolute inside image wrapper */}
        <TouchableOpacity onPress={handleWishlist} style={styles.wishlistBtn}>
          <Ionicons
            name={isInWishlist ? "heart" : "heart-outline"}
            size={16}
            color={isInWishlist ? "#EF4444" : "#9CA3AF"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View>
          <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
          <Text style={styles.unit}>1 unit</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>₹</Text>
            <Text style={styles.price}>{product.price}</Text>
          </View>

          {!cartItem ? (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={handleAdd}
            >
              <Text style={styles.addText}>ADD</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyControl}>
              <TouchableOpacity onPress={handleRemove} style={styles.qtyBtn}>
                <Ionicons name="remove" size={16} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{cartItem.qty}</Text>
              <TouchableOpacity onPress={handleAdd} style={styles.qtyBtn}>
                <Ionicons name="add" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 90,
    height: 90,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // for absolute wishlist btn
  },
  image: {
    width: 70,
    height: 70,
  },
  wishlistBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
    height: 90,
    paddingVertical: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.neutral.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  unit: {
    fontSize: 12,
    color: colors.neutral.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 12,
    color: colors.neutral.text,
    fontWeight: '600',
    marginRight: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral.text,
  },
  addBtn: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.brand[700],
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: colors.brand[700],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addText: {
    fontWeight: '800',
    color: colors.brand[800], // Darker yellow for text
    fontSize: 13,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand[700],
    borderRadius: 8,
    height: 32,
    paddingHorizontal: 4,
    minWidth: 80,
    justifyContent: 'space-between',
  },
  qtyBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontWeight: '700',
    color: '#000',
    fontSize: 14,
    marginHorizontal: 4,
  },
});

