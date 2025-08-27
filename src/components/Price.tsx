import React from 'react';
import { Text } from 'react-native-paper';
export function Price({ value }: { value: number }) {
  return <Text variant="titleMedium">${value.toFixed(2)}</Text>;
}
