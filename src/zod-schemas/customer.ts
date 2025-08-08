import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (field) => field.min(1, "First name is required"),
  lastName: (field) => field.min(1, "Last name is required"),
  address1: (field) => field.min(1, "Address is required"),
  city: (field) => field.min(1, "City is required"),
  state: (field) =>
    field
      .length(2, "State must be exactly 2 characters.")
      .min(1, "State is required"),
  postcode: (field) =>
    field.regex(
      /^\d{5}(-\d{4})?$/,
      "Postcode must be a valid format (5 digits with optional hyphen with 4 extra digits)"
    ),
  email: (field) => field.email("Invalid email address"),
  phone: (field) =>
    field.regex(
      /^\+?[1-9]\d{1,14}$/,
      "Phone number must be a valid format (international format with optional +)"
    ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema.type;
export type selectCustomerSchemaType = typeof selectCustomerSchema.type;
