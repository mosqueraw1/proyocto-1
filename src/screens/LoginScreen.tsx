import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Appbar, TextInput, Button, Text, IconButton } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import usuarios from "../data/usuarios.json";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      login(user);
      setError("");
    } else {
      setError("Credenciales incorrectas ❌");
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content
          title="Iniciar Sesión"
          titleStyle={{ fontWeight: "700", fontSize: 20 }}
        />
        <IconButton icon="help-circle-outline" iconColor="#fff" />
      </Appbar.Header>

      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1040/1040221.png",
          }}
          style={styles.logo}
        />

        <Text variant="headlineMedium" style={styles.title}>
          TenisApp 👟
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Compra los últimos modelos con estilo moderno ✨
        </Text>

        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
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
          left={<TextInput.Icon icon="lock-outline" />}
          right={<TextInput.Icon icon="eye-off-outline" />} // 👁️ para mostrar/ocultar
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          icon="login"
        >
          Ingresar
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate("Register")}
          style={styles.secondaryButton}
          labelStyle={styles.secondaryLabel}
          icon="account-plus-outline"
        >
          Crear cuenta nueva
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
    elevation: 0,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontWeight: "800",
    marginBottom: 8,
    color: "#0D6EFD",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 28,
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginTop: -8,
    marginBottom: 16,
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  button: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 6,
    marginBottom: 12,
    backgroundColor: "#0D6EFD",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  secondaryButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 6,
    borderColor: "#0D6EFD",
  },
  secondaryLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0D6EFD",
  },
});
