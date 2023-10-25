import { DomainEvent } from "@/events/domain-event";
import { Entity } from "../entity";
import { DomainEvents } from "@/events/domain-events";

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = [];

  public get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}