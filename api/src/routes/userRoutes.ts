import express, { Router } from "express";
import UserController from "../controllers/UserController";

const router: Router = express.Router();

router.get("/users", UserController.getUsers);
router.post("/users", UserController.createUser);

export default router;
