import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull(), // Changed from varchar to numeric
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

export const Expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull().default(0), // Numeric value for amount
  budgetId: integer("budgetId").references(() => Budgets.id), 
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});
