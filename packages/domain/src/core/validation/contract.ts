import { ZodSchema } from 'zod';
import { Notification } from './notification';

export class Contract<Schema extends ZodSchema<unknown>> {
  private _notifications: Array<Notification> = [];

  constructor(schema: Schema, fields: typeof schema['_type']) {
    this.validate(schema, fields);
  }

  private validate(schema: Schema, fields: typeof schema['_type']) {
    const validation = schema.safeParse(fields);

    if (!validation.success) {
      this._notifications = validation.error.issues.map(issue => {
        const path = issue.path.join('.');
        const message = issue.message;
        return new Notification(path, message);
      });
    }

    return this;

  }

  protected result(property: string, message: string): void {
    this._notifications.unshift(new Notification(property, message));
  }

  public get notifications(): Array<Notification> {
    return this._notifications;
  }
}