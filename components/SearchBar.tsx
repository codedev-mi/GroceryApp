import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar({ onSearch }: { onSearch: (text: string) => void }) {
    return (
        <View style={styles.container}>
            <Feather name="search" size={20} color="#7C7C7C" />
            <TextInput placeholder="Search products..." style={styles.input} onChangeText={onSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F2F3F2',
        fontWeight: '500',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        color: '#7C7C7C',
    },
});