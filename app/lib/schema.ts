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
  amount: numeric("amount").notNull(), // Numeric value for amount
  budgetId: integer("budgetId").references(() => Budgets.id),
  createdBy: varchar("createdBy").notNull(),  // Added createdBy to Expenses
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const SavingsGoals = pgTable("savings_goals", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  targetamount: numeric("targetamount").notNull(),
  currentAmount: numeric("currentAmount").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

