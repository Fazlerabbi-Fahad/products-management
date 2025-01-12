import { Router } from "express"
import { ProductsController } from "./products.controller"
import validateRequest from "../../middlewares/validateRequest"
import { ProductsValidation } from "./products.validation"

const router = Router()

router.post('/products', validateRequest(ProductsValidation.createProducts),ProductsController.saveProducts)

router.patch(
    '/products/:id',
    ProductsController.updateProduct,
  )

router.get('/products', ProductsController.getAllProducts)



export const ProductsRouter = router