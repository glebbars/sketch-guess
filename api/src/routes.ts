import express, { Router } from "express";
// import UserController from "./controllers/UserController";

const router: Router = express.Router();

// user
// router.get("/users", UserController.getUsers);
// router.post("/users", UserController.createUser);

// canvas ws
router.get("/", (req, res) => {
  res.send("test");
});

export default router;
