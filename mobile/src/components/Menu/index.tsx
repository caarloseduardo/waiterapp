import { FlatList } from 'react-native'

import {
  Product,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton
} from './styles'

import { Text } from '../Text'

import { formatCurrency } from '../../utils/format-currency'
import { products } from '../../mocks/products'
import { PlusCircle } from '../Icons/PlusCircle'

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={Separator}
      keyExtractor={product => product._id}
      renderItem={({ item: product }) => (
        <Product>
          <ProductImage
            source={{
              uri: `http://192.168.15.78:19000/uploads/${product.imagePath}`
            }}
          />

          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text size={14} color="#666" style={{ marginVertical: 8 }}>
              {product.description}
            </Text>
            <Text size={14} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </ProductDetails>

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
    />
  )
}
