import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '@/colors';
import { RootState } from '../store';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { Product } from '../types';

interface Props {
    product: Product;
    customWidth?: number;
    showDeliveryTime?: boolean;
}

export default function ProductGridItem({ product, customWidth, showDeliveryTime = true }: Props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Default fallback if no custom width provided
    const defaultWidth = (width - 48) / 2;
    const cardWidth = customWidth ?? defaultWidth;

    const cartItem = useSelector((state: RootState) =>
        state.cart.items.find(i => i.id === product.id)
    );

    const isInWishlist = useSelector((state: RootState) =>
        state.wishlist.items.some(i => i.id === product.id)
    );

    // Calculate discount percentage
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

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
            activeOpacity={0.9}
            onPress={handlePress}
            style={[styles.card, { width: cardWidth }]}
        >
            {/* Discount Badge */}
            {discount > 0 && (
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{discount}% OFF</Text>
                </View>
            )}

            {/* Wishlist Button */}
            <TouchableOpacity onPress={handleWishlist} style={styles.wishlistBtn}>
                <Ionicons
                    name={isInWishlist ? "heart" : "heart-outline"}
                    size={20}
                    color={isInWishlist ? "#EF4444" : "#9CA3AF"}
                />
            </TouchableOpacity>

            {/* Image Section */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    contentFit="contain"
                    transition={200}
                />

                {/* Delivery Time (Mock) */}
                {showDeliveryTime && (
                    <View style={styles.deliveryBadge}>
                        <Ionicons name="time" size={10} color="#333" />
                        <Text style={styles.deliveryText}>12 MINS</Text>
                    </View>
                )}
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
                <Text numberOfLines={1} style={styles.weight}>
                    {product.description?.includes('1kg') ? '1 kg' : 'Standard'}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.priceContainer}>
                        <View style={styles.priceRow}>
                            <Text style={styles.currencySymbol}>₹</Text>
                            <Text style={styles.currentPrice}>{product.price}</Text>

                            {product.originalPrice && product.originalPrice > product.price && (
                                <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                            )}
                        </View>
                    </View>

                    {!cartItem ? (
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAdd}
                        >
                            <Text style={styles.addButtonText}>ADD</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.qtyControl}>
                            <TouchableOpacity onPress={handleRemove} style={styles.qtyBtn}>
                                <Ionicons name="remove" size={18} color="#FFF" />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{cartItem.qty}</Text>
                            <TouchableOpacity onPress={handleAdd} style={styles.qtyBtn}>
                                <Ionicons name="add" size={18} color="#FFF" />
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
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        overflow: 'hidden',
    },
    discountBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#5D3FD3',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 3,
        zIndex: 10,
    },
    discountText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: '700',
    },
    wishlistBtn: {
        position: 'absolute',
        top: 6,
        right: 6,
        zIndex: 20,
        backgroundColor: '#FFF',
        borderRadius: 12,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
        elevation: 2,
    },
    imageContainer: {
        width: '100%',
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    image: {
        width: '85%',
        height: '85%',
    },
    deliveryBadge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#F3F4F6',
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    deliveryText: {
        fontSize: 8,
        fontWeight: '700',
        color: '#666',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
        height: 36,
        lineHeight: 18,
    },
    weight: {
        fontSize: 11,
        color: '#9CA3AF',
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'column',
        gap: 8,
    },
    priceContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    currencySymbol: {
        fontSize: 11,
        fontWeight: '600',
        color: '#111',
        marginRight: 1,
    },
    currentPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111',
    },
    originalPrice: {
        fontSize: 11,
        color: '#9CA3AF',
        textDecorationLine: 'line-through',
        marginLeft: 4,
    },
    addButton: {
        borderWidth: 1,
        borderColor: '#0C831F',
        backgroundColor: '#F7FEFA',
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 4,
        elevation: 1,
        shadowColor: '#0C831F',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 }
    },
    addButtonText: {
        color: '#0C831F',
        fontSize: 13,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    qtyControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0C831F',
        borderRadius: 6,
        height: 32,
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 4,
        paddingHorizontal: 8,
    },
    qtyBtn: {
        width: 24,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },
});
