import React from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import { Appbar, Card, Text, IconButton, Button } from "react-native-paper";
import { useCart } from "../context/CartContext";

export default function CartScreen({ navigation }: any) {
  const { items, add, remove, clear, total } = useCart();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Carrito 🛒" />
        {items.length > 0 && (
          <Appbar.Action icon="delete-outline" onPress={clear} />
        )}
      </Appbar.Header>

      <FlatList
        data={items}
        keyExtractor={(it) => it.product.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="headlineMedium" style={styles.emptyText}>
              Tu carrito está vacío
            </Text>
            <Button
              mode="contained"
              icon="storefront-outline"
              style={styles.emptyButton}
              onPress={() => navigation.navigate("Home")}
            >
              Ver productos
            </Button>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.product.name}
              titleStyle={styles.cardTitle}
              subtitle={item.product.brand}
              subtitleStyle={styles.cardSubtitle}
              right={() => (
                <Text style={styles.price}>
                  ${item.product.price.toFixed(2)}
                </Text>
              )}
            />
            <Card.Content>
              <View style={styles.itemRow}>
                <Image
                  source={{ uri: item.product.image }}
                  style={styles.image}
                />
                <View style={styles.qtyContainer}>
                  <IconButton
                    icon="minus-circle-outline"
                    onPress={() => remove(item.product.id)}
                  />
                  <Text variant="titleMedium" style={styles.qtyText}>
                    {item.qty}
                  </Text>
                  <IconButton
                    icon="plus-circle-outline"
                    onPress={() => add(item.product)}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
        ListFooterComponent={
          items.length > 0 ? (
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text variant="titleLarge" style={styles.totalLabel}>
                  Total
                </Text>
                <Text variant="titleLarge" style={styles.totalValue}>
                  ${total.toFixed(2)}
                </Text>
              </View>
              <Button
                mode="contained"
                icon="credit-card-outline"
                style={styles.checkoutButton}
                labelStyle={{ fontSize: 16, fontWeight: "700" }}
              >
                Proceder al pago
              </Button>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#0D6EFD",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  cardSubtitle: {
    color: "#6B7280",
  },
  price: {
    fontWeight: "700",
    fontSize: 16,
    color: "#0D6EFD",
    marginRight: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 90,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  qtyText: {
    fontWeight: "700",
    marginHorizontal: 4,
  },
  footer: {
    marginTop: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  totalLabel: {
    fontWeight: "800",
    color: "#111827",
  },
  totalValue: {
    fontWeight: "800",
    fontSize: 18,
    color: "#0D6EFD",
  },
  checkoutButton: {
    borderRadius: 14,
    paddingVertical: 6,
    backgroundColor: "#0D6EFD",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 16,
  },
  emptyText: {
    marginBottom: 12,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  emptyButton: {
    borderRadius: 12,
    backgroundColor: "#0D6EFD",
  },
});
