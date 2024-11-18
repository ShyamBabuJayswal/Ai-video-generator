import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL);
const db = drizzle({sql });
