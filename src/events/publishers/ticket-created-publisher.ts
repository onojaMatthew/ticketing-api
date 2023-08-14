import { Publisher, Subjects, TicketCreatedEvent } from "@onojanpmorg/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}