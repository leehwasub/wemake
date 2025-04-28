import { bigint, check, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { PRODUCT_STAGES } from "./constants";
import { table } from "console";
import { sql } from "drizzle-orm";

export const product_stage = pgEnum("product_stage", PRODUCT_STAGES.map((stage) => stage.value) as [string, ...string[]]);

export const teams = pgTable("teams", {
  team_id: bigint({mode: "number"}).primaryKey().generatedAlwaysAsIdentity(),
  product_name: text().notNull(),
  team_size: integer().notNull(),
  equity_split: integer().notNull(),
  product_stage : product_stage().notNull(),
  roles: text().notNull(),
  product_description: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
}, (table) => [
  check("team_size_check", sql`${table.team_size} BETWEEN 1 AND 100`),
  check("equity_split_check", sql`${table.equity_split} BETWEEN 1 AND 100`),
  check("product_stage_check", sql`LENGTH(${table.product_description}) <= 200`),
]);
