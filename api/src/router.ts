import path from 'node:path'
import multer from 'multer'
import { Router } from 'express'
import { createCategory } from './app/use-cases/categories/create-category'
import { listCategories } from './app/use-cases/categories/list-categories'
import { createProduct } from './app/use-cases/products/create-product'
import { listProducts } from './app/use-cases/products/list-products'
import { listProductsByCategory } from './app/use-cases/categories/list-products-by-category'
import { listOrders } from './app/use-cases/orders/list-orders'
import { createOrder } from './app/use-cases/orders/create-order'
import { changeOrderStatus } from './app/use-cases/orders/change-order-status'
import { cancelOrder } from './app/use-cases/orders/cancel-order'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

router.get('/categories', listCategories)

router.post('/categories', createCategory)

router.get('/products', listProducts)

router.post('/products', upload.single('image'), createProduct)

router.get('/categories/:categoryId/products', listProductsByCategory)

router.get('/orders', listOrders)

router.post('/orders', createOrder)

router.patch('/orders/:orderId', changeOrderStatus)

router.delete('/orders/:orderId', cancelOrder)
