import { Router } from "express"
import { CategoryController } from "./categories.controller"
import validateRequest from "../../middlewares/validateRequest"
import { CategoryValidation } from "./categories.validation"

const router = Router()

router.post('/category',validateRequest(CategoryValidation.createCategory), CategoryController.saveCategory)


router.get('/category', CategoryController.getAllCategory)



export const CategoryRouter = router