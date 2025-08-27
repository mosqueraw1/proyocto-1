import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Price } from './Price';
import { BrandChip } from './BrandChip';
import { Product } from '../types';

export function ProductCard({ item, onPress }: { item: Product; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={{ borderRadius: 20, overflow: 'hidden', margin: 8 }}>
        <Card.Cover source={{ uri: item.image }} style={{ height: 160 }} />
        <Card.Content style={{ paddingVertical: 12 }}>
          <Text variant="titleMedium" style={{ fontWeight: '700' }}>{item.name}</Text>
          <BrandChip brand={item.brand} />
          <Price value={item.price} />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
