import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Category } from "../types";

export default function CategoryCard({
  category,
  onPress,
}: {
  category: Category;
  onPress?: (category: Category) => void;
}) {
  return (
    <TouchableOpacity style={styles.categoryCard} onPress={() => onPress?.(category)}>
      {category.image && <Image
        source={{
          uri: category.image,
        }}
        style={{ width: 60, height: 60, marginBottom: 8 }}
        resizeMode="contain" />}
      <Text numberOfLines={2} style={styles.categoryName}>{category.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    width: "100%",
    height: 140,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#181725",
    textAlign: "center",
  },
});
