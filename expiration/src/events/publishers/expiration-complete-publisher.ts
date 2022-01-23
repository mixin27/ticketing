import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@xintickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
