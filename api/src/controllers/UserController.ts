import { Request, Response } from "express";
import { Connection, RowDataPacket } from "mysql2";
import db from "../config/database";

class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const connection: Connection = await db.getConnection();

      const [rows] = await connection.execute("SELECT * FROM users");
      connection.release();

      const users = rows as RowDataPacket[];
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const connection: Connection = await db.getConnection();
      await connection.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email]
      );
      connection.release();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default UserController;
