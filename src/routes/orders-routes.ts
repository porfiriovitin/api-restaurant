import { Router } from "express";
import { OrderController } from "@/controllers/orders-controller";

const ordersRoutes = Router();
const orderController = new OrderController();

ordersRoutes.post("/", orderController.create);
ordersRoutes.get("/session/:table_session_id", orderController.index)
ordersRoutes.get("/session/:table_session_id/total", orderController.show)

export { ordersRoutes };
