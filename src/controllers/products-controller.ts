import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";

import {z} from "zod"

class ProductController {
    async index (request: Request, response: Response, next:NextFunction){
        try{
            return response.json({message: "Ok"})
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
}

export { ProductController }