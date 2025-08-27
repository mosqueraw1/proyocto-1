import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Appbar, TextInput, Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios ❗");
      return;
    }
    register(name, email, password);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title="Registro" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      {/* Formulario */}
      <View style={styles.content}>
        {/* Logo opcional */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1040/1040221.png",
          }}
          style={styles.logo}
        />

        <Text variant="headlineMedium" style={styles.title}>
          Crea tu cuenta 👟
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Accede a las últimas novedades en tenis con estilo moderno ✨
        </Text>

        <TextInput
          label="Nombre completo"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="account-outline" />}
        />

        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          left={<TextInput.Icon icon="email-outline" />}
        />

        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="shield-key-outline" />}
          right={<TextInput.Icon icon="eye-off-outline" />}
        />

        {/* Error */}
        {error ? (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={20}
              color="red"
            />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Botón */}
        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          icon="account-plus-outline"
        >
          Crear cuenta
        </Button>
      </View>
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
  headerTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontWeight: "800",
    marginBottom: 6,
    color: "#0D6EFD",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  errorText: {
    color: "red",
    marginLeft: 6,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 6,
    marginTop: 8,
    backgroundColor: "#0D6EFD",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
