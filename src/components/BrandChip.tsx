import React from 'react';
import { Chip } from 'react-native-paper';
export function BrandChip({ brand }: { brand: string }) {
  return <Chip style={{ marginTop: 6, alignSelf: 'flex-start' }}>{brand}</Chip>;
}
