import { Router } from 'express'
import { createCategory } from './app/use-cases/categories/create-category'
import { listCategories } from './app/use-cases/categories/list-categories'
import { createProduct } from './app/use-cases/products/create-product'
import { listProducts } from './app/use-cases/products/list-products'

export const router = Router()

router.get('/categories', listCategories)

router.post('/categories', createCategory)

router.get('/products', listProducts)

router.post('/products', createProduct)

router.get('/categories/:categoryId/products', (req, res) => {
  res.send('OK')
})

router.get('/orders', (req, res) => {
  res.send('OK')
})

router.post('/orders', (req, res) => {
  res.send('OK')
})

router.patch('/orders/:orderId', (req, res) => {
  res.send('OK')
})

router.delete('/orders/:orderId', (req, res) => {
  res.send('OK')
})
