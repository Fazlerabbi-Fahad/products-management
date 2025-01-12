import { z } from "zod";
import { prodcutsAvailability } from "./products.constant";

const createProducts = z.object({
    body: z.object({
      name: z.string({
        required_error: 'Name is required',
      }),
      price: z.number({
        required_error: 'Price is required',
      }),
      discount: z.number({
        required_error: 'Discount is required',
      }),
      image: z.string({
        required_error: 'Image is required',
      }),
      status: z.enum([...prodcutsAvailability] as [string, ...string[]], {
        required_error: 'Status is required',
      }),
      categoryId: z.string({
        required_error: 'Category is required',
      }),
    }),
  })

  export const ProductsValidation = {
    createProducts,
  }