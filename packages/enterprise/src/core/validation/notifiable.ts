import { Notification } from "./notification";
import { Contract } from "./contract";
import { INotifiable } from "./interfaces/notifiable";
import { ZodSchema } from "zod";

/**
 * Abstract class representing a notifiable entity.
 * Implements the `INotifiable` interface.
 */
export abstract class Notifiable implements INotifiable {
  private _notifications: Notification[] = new Array<Notification>();

  /**
   * Adds a notification to the list of notifications.
   *
   * @param {string | Notification | Contract} property - The notification property to add.
   * @param {string} [message] - An optional message for the notification.
   * @return {void}
   */
  public addNotification(
    property: string | Notification | Contract<ZodSchema>,
    message?: string,
  ): void {
    if (property instanceof Notification) {
      this._notifications.unshift(property);
    }
    if (property instanceof Contract) {
      const notifications = property.notifications;
      this._notifications.unshift(...notifications);
    }
    if (typeof property === "string") {
      const newNotification = new Notification(property, String(message));
      this._notifications.unshift(newNotification);
    }
  }

  addNotifications(notifications: Notification[]): void {
    this._notifications.push(...notifications);
  }

  get notifications(): Notification[] {
    return this._notifications;
  }

  /**
   * Check if there are no notifications.
   *
   * @return {boolean} true if the notifications are valid, false otherwise
   */
  public isValid(): boolean {
    return this._notifications.length <= 0;
  }

  /**
   * Determines if the object is invalid.
   *
   * @return {boolean} True if the object is invalid, false otherwise.
   */
  public isInvalid(): boolean {
    return this._notifications.length > 0;
  }
}
