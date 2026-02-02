import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '@/colors';
import Container from '../../../components/Container';
import { RootState } from '../../../store';
import { addToCart, deleteFromCart, removeFromCart } from '../../../store/slices/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);
  // Calculate total
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <Container>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={colors.neutral.muted} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity style={styles.startShoppingBtn} onPress={() => router.push('/')}>
            <Text style={styles.startShoppingText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.headerTitle}>My Cart</Text>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                contentFit="contain"
              />
            </View>

            <View style={styles.itemInfo}>
              <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>

            <View style={styles.actionsColumn}>
              <TouchableOpacity onPress={() => dispatch(deleteFromCart(item.id))} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={20} color={colors.semantic.error} />
              </TouchableOpacity>

              <View style={styles.qtyControl}>
                <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={styles.qtyBtn}>
                  <Ionicons name="remove" size={16} color={colors.neutral.text} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <TouchableOpacity onPress={() => dispatch(addToCart(item))} style={styles.qtyBtn}>
                  <Ionicons name="add" size={16} color={colors.neutral.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.billDetails}>
          <Text style={styles.sectionHeader}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>₹{subtotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={styles.billValue}>₹{deliveryFee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.billRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerTotalLabel}>Total</Text>
          <Text style={styles.footerTotalValue}>₹{total}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Proceed to Pay</Text>
          <Ionicons name="arrow-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingTop: 50, // Top spacing
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.neutral.text,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: colors.neutral.muted,
    marginTop: 16,
    marginBottom: 24,
  },
  startShoppingBtn: {
    backgroundColor: colors.brand[700],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  startShoppingText: {
    fontWeight: '700',
    color: '#000',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageWrapper: {
    width: 70,
    height: 70,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    height: 70,
    justifyContent: 'space-around',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral.text,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral.text,
  },
  actionsColumn: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 70,
  },
  deleteBtn: {
    padding: 4,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    padding: 4,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  qtyText: {
    marginHorizontal: 10,
    fontWeight: '600',
    fontSize: 14,
    color: colors.neutral.text,
  },
  billDetails: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.neutral.text,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    color: colors.neutral.textSecondary,
    fontSize: 14,
  },
  billValue: {
    color: colors.neutral.text,
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.neutral.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 24,
    paddingBottom: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  footerTotalLabel: {
    fontSize: 12,
    color: colors.neutral.textSecondary,
  },
  footerTotalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.neutral.text,
  },
  checkoutBtn: {
    backgroundColor: colors.brand[700],
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    gap: 8,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
});
