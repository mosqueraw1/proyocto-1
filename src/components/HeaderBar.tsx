import React from 'react';
import { View } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function HeaderBar({ navigation }: any) {
  const { items } = useCart();
  const { logout } = useAuth();
  return (
    <Appbar.Header>
      <Appbar.Content title="Tenis" />
      <Appbar.Action icon="logout" onPress={logout} />
      <View>
        <Appbar.Action icon="cart" onPress={() => navigation.navigate('Cart')} />
        {items.length > 0 && (
          <Badge style={{ position: 'absolute', top: 4, right: 4 }}>{items.length}</Badge>
        )}
      </View>
    </Appbar.Header>
  );
}
