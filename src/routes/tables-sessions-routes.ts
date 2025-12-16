import { Router } from "express";
import {TablesSessionsController} from "@/controllers/tables-sessions-controller"

const tablesSessionsRoutes = Router()
const tablesSessionController = new TablesSessionsController()

tablesSessionsRoutes.post("/", tablesSessionController.create)

export {tablesSessionsRoutes}