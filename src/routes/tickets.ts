import { NotFoundError, current_user, NotAuthorizedError, requireAuth } from "@onojanpmorg/common";
import express, { Request, Response } from "express";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { TicketUdatedPublisher } from "../events/publishers/tickete-updated-publisher";
import { Ticket } from "../models/tickets";
import { natsWrapper } from "../nats-wrapper";
import { ticket_validator } from "./validation";

const router = express.Router();

router.post("/", requireAuth, ticket_validator, async (req: Request, res: Response) => {
  const { title, price } = req.body;
  let ticket = Ticket.build({ title, price, userId: req.currentUser!._id });
  ticket = await ticket.save();
  new TicketCreatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
  })
  res.status(201).send(ticket);
});

router.get("/", requireAuth, async (req: Request, res: Response) => {
  const tickets = await Ticket.find();
  res.status(200).send(tickets);
});

router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) throw new NotFoundError();
  return res.status(200).send(ticket);
});

router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  console.log(ticket)
  if (!ticket) { 
    throw new NotFoundError();
  }

  if (ticket.userId !== req.currentUser?._id) {
    throw new NotAuthorizedError()
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price
  })

  await ticket.save();
  new TicketUdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  });
  return res.send(ticket);
})

export { router as ticketRoutes }