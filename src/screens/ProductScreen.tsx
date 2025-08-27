import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Appbar, Button, Snackbar, Text } from "react-native-paper";
import { useCart } from "../context/CartContext";

export default function ProductScreen({ route, navigation }: any) {
  const { product } = route.params;
  const { add } = useCart();
  const [snack, setSnack] = useState(false);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={product.brand} />
        <Appbar.Action
          icon="cart"
          onPress={() => navigation.navigate("Cart")}
        />
      </Appbar.Header>

      <View style={styles.content}>
        {/* Imagen del producto */}
        <Image source={{ uri: product.image }} style={styles.image} />

        {/* Info del producto */}
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productBrand}>{product.brand}</Text>
        <Text style={styles.price}>${product.price.toLocaleString()}</Text>

        {/* Botón */}
        <Button
          mode="contained"
          icon="cart"
          style={styles.button}
          labelStyle={{ fontSize: 16, fontWeight: "700" }}
          onPress={() => {
            add(product);
            setSnack(true);
          }}
        >
          Añadir al carrito
        </Button>
      </View>

      <Snackbar
        visible={snack}
        onDismiss={() => setSnack(false)}
        duration={1500}
        style={styles.snackbar}
      >
        ✅ Agregado al carrito
      </Snackbar>
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
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    elevation: 4, // sombra en Android
    shadowColor: "#000", // sombra en iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  productName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
  },
  productBrand: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0D6EFD",
    marginBottom: 24,
  },
  button: {
    width: "100%",
    borderRadius: 14,
    paddingVertical: 6,
    backgroundColor: "#0D6EFD",
  },
  snackbar: {
    backgroundColor: "#10B981",
  },
});
