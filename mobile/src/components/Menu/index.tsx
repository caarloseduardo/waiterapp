import { useState } from 'react'
import { FlatList } from 'react-native'

import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton
} from './styles'

import { Text } from '../Text'

import { PlusCircle } from '../Icons/PlusCircle'
import { ProductModal } from '../ProductModal'

import { Product } from '../../types/product'
import { formatCurrency } from '../../utils/format-currency'

interface MenuProps {
  onAddToCart: (product: Product) => void
  products: Product[]
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null)

  function handleOpenModal(product: Product) {
    setSelectedProduct(product)
    setIsModalVisible(true)
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.15.78:3001/uploads/${product.imagePath}`
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

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  )
}
