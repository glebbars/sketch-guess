import { createPool, Pool } from "mysql2";

const pool: Pool = createPool({
  host: "localhost",
  user: "your_user",
  password: "your_password",
  database: "your_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
