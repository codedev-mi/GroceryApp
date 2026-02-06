import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { colors } from '@/colors';
import ProductGridItem from '../../components/ProductGridItem';
import { RootState } from '../../store';
import { Product } from '../../types';

export default function Wishlist() {
    const router = useRouter();
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Wishlist</Text>
                <View style={{ width: 40 }} />
            </View>

            {wishlistItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="heart-outline" size={60} color="#E5E7EB" />
                    </View>
                    <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
                    <Text style={styles.emptyText}>
                        Tap the heart icon on any product to save it here for later.
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/' as any)} style={styles.browseBtn}>
                        <Text style={styles.browseBtnText}>Browse Products</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={wishlistItems}
                    keyExtractor={(item: Product) => item.id.toString()}
                    renderItem={({ item }: { item: Product }) => (
                        <ProductGridItem product={item} />
                    )}
                    {...({ numColumns: 2 } as any)}
                    columnWrapperStyle={{ gap: 12 }}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF', // Cleaner white bg
    },
    header: {
        height: 60, // Taller header
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start', // Align left
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111',
        flex: 1,
        textAlign: 'center', // Center title properly
        marginRight: 40, // Balance the back button space
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        marginTop: -40,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    browseBtn: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        backgroundColor: colors.brand[700],
        borderRadius: 12,
        elevation: 2,
    },
    browseBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },
});
