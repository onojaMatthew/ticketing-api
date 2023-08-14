import { Publisher, Subjects, TicketUpdatedEvent } from "@onojanpmorg/common";

export class TicketUdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}