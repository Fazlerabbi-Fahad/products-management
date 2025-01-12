import express from 'express'
import { ProductsRouter } from '../modules/products/products.route'
import { CategoryRouter } from '../modules/categories/categories.route'
const router = express.Router()

const modulesRouter = [
  {
    path: '/products',
    route: ProductsRouter,
  },
  {
    path: '/category',
    route: CategoryRouter,
  },
]

modulesRouter.forEach(route => router.use(route.path, route.route))

export default router
