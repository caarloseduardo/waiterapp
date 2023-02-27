import { Request, Response } from 'express'
import { Product } from '../../models/product'

export async function createProduct(req: Request, res: Response) {
  try {
    const { category, description, imagePath, ingredients, name, price } =
      req.body

    const product = await Product.create({
      category,
      description,
      imagePath,
      ingredients,
      name,
      price
    })

    res.status(201).json(product)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}
