import { Router } from "express";
import { TablesSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router();
const tablesSessionController = new TablesSessionsController();

tablesSessionsRoutes.post("/", tablesSessionController.create);
tablesSessionsRoutes.get("/", tablesSessionController.index);
tablesSessionsRoutes.patch("/:id", tablesSessionController.update);

export { tablesSessionsRoutes };
