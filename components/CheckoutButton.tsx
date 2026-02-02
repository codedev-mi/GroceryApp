import { useAppSelector } from "@/store/hooks";
import { router, useSegments } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface CheckoutButtonProps {
  onSubmit?: () => void;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = () => {
  const cart = useAppSelector((state) => state.cart);
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  if (!cart.items?.length) return null; // important for UX

  // replace with real selector if you have one
  const totalAmount = useMemo(
    () =>
      cart.items.reduce(
        (sum: number, item: any) =>
          sum + item.price * item.qty,
        0,
      ),
    [cart.items],
  );

  const onCheckout = () => {
    // Implement navigation to checkout screen
    router.push("/cart");
  };
  return (
    <View
      style={[
        styles.container,
        { bottom: insets.bottom + 64 }, // 64 ≈ tab bar height
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onCheckout}
        style={styles.button}
      >
        <Text style={styles.checkoutText}>Go to Checkout</Text>

        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>${totalAmount.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 24,
    right: 24,
    zIndex: 100,
  },

  button: {
    backgroundColor: "#55B174", // green from image
    height: 64,
    borderRadius: 32,
    paddingHorizontal: 24,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  checkoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  priceBadge: {
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  priceText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
