import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";

import {int, z} from "zod"

class ProductController {
    async index (request: Request, response: Response, next:NextFunction){
        try{
            const { name } = request.query

            const products = await knex<ProductRepository>("products").select().whereLike("name", `%${name ?? ""}%`).orderBy("id")

            return response.json({products})

        }catch(error){
            next(error)
        }
    }

    async create(request:Request, response:Response, next:NextFunction){
        try{

            const bodySchema = z.object({
                name: z.string().trim().min(4).nonempty({message: "Name is required"}),
                price: z.number().gt(0, {message: "Price must be greater than zero."})
            })

            const {name, price} = bodySchema.parse(request.body)

            await knex<ProductRepository>("products").insert({ name: name, price: price })

            return response.status(201).json()

        } catch(error){
            next(error)
        }
    }

    async update(request:Request, response: Response, next: NextFunction){
        try{
            const productId = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {message: "id must be an integer"}).parse(request.params.id)

            const bodySchema = z.object({
                name: z.string().trim().min(4).nonempty({message: "Name is required"}),
                price: z.number().gt(0, {message: "Price must be greater than zero."})
            })

            const {name, price} = bodySchema.parse(request.body)

            await knex<ProductRepository>("products").update({name: name, price: price, updated_at: knex.fn.now()}).where({id:productId})
            
            return response.status(200).json({message: "Product updated sucessfully"})

        }catch(error){
            next(error)
        }
    }
}

export { ProductController }