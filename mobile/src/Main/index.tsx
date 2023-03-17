import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import {
  Container,
  CenteredContainer,
  CategoriesContainer,
  MenuContainer,
  Footer
  // FooterContainer
} from './styles'

import { Header } from '../components/Header'
import { Categories } from '../components/Categories'
import { Menu } from '../components/Menu'
import { Button } from '../components/Button'
import { TableModal } from '../components/TableModal'
import { Cart } from '../components/Cart'
import { Empty } from '../components/Icons/Empty'
import { Text } from '../components/Text'

import { CartItem } from '../types/cart-item'
import { Product } from '../types/product'
import { Category } from '../types/category'

import { api } from '../utils/api'

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const categories = api.get('/categories')
    const products = api.get('/products')

    Promise.all([categories, products]).then(
      ([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data)
        setProducts(productsResponse.data)
        setIsLoading(false)
      }
    )
  }, [])

  async function handleSelectedCategory(categoryId: string) {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`

    setIsLoadingProducts(true)
    const { data } = await api.get(route)

    setProducts(data)
    setIsLoadingProducts(false)
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table)
  }

  function handleResetOrder() {
    setSelectedTable('')
    setCartItems([])
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true)
    }

    setCartItems(prevState => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      )

      if (itemIndex < 0) {
        return prevState.concat({ quantity: 1, product })
      }

      const newCartItems = [...prevState]
      const item = newCartItems[itemIndex]
      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      }

      return newCartItems
    })
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems(prevState => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      )
      const item = prevState[itemIndex]
      const newCartItems = [...prevState]

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1)

        return newCartItems
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      }

      return newCartItems
    })
  }

  return (
    <>
      <Container>
        <Header selectedTable={selectedTable} onCancelOder={handleResetOrder} />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectedCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#d73035" size="large" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddToCart={handleAddToCart} products={products} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <Footer>
        {/* <FooterContainer> */}
        {selectedTable ? (
          <Cart
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
            onConfirmOrder={handleResetOrder}
            selectedTable={selectedTable}
          />
        ) : (
          <Button
            onPress={() => setIsTableModalVisible(true)}
            disabled={isLoading}
          >
            Novo Pedido
          </Button>
        )}
        {/* </FooterContainer> */}
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  )
}
