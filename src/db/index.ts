import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

// Logger
// const db = drizzle(sql, { logger:true, schema });
const db = drizzle(sql, { schema });

export { db };
