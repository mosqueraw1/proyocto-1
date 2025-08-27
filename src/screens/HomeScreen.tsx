import React, { useMemo, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { TextInput, Chip, Text } from "react-native-paper";
import { HeaderBar } from "../components/HeaderBar";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import { Product } from "../types";

export default function HomeScreen({ navigation }: any) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string | null>(null);

  const brands = useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.brand))),
    []
  );

  const filtered = useMemo(() => {
    return PRODUCTS.filter(
      (p) =>
        (!brand || p.brand === brand) &&
        (p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, brand]);

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} />

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="🔍 Buscar modelos o marcas"
          value={query}
          onChangeText={setQuery}
          mode="outlined"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
        />

        <Text style={styles.filterTitle}>Filtrar por marca:</Text>
        <View style={styles.chipContainer}>
          <Chip
            selected={!brand}
            onPress={() => setBrand(null)}
            style={[styles.chip, !brand && styles.chipSelected]}
            textStyle={!brand ? styles.chipTextSelected : styles.chipText}
          >
            Todas
          </Chip>
          {brands.map((b) => (
            <Chip
              key={b}
              selected={brand === b}
              onPress={() => setBrand(b)}
              style={[styles.chip, brand === b && styles.chipSelected]}
              textStyle={brand === b ? styles.chipTextSelected : styles.chipText}
            >
              {b}
            </Chip>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item: Product) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate("Product", { product: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // fondo suave
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchInput: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  filterTitle: {
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 16,
    color: "#374151",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  chipSelected: {
    backgroundColor: "#0D6EFD",
  },
  chipText: {
    color: "#374151",
    fontWeight: "600",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  listContainer: {
    padding: 12,
    paddingBottom: 24,
  },
});
