import { body } from "express-validator";

export const ticket_validator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0")
]