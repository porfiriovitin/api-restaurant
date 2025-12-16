import { Request, Response, NextFunction } from "express"
import { knex } from "@/database/knex"

class TablesSessionsController{
    async create(request:Request, response: Response, next: NextFunction){
        try{

        }catch(error){
            next(error)
        }
    }
}

export {TablesSessionsController}