import { ticketRoutes } from "./tickets";

export const ticketRouter = (app: any) => {
  app.use("/api/tickets", ticketRoutes);
}

