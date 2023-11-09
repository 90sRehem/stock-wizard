import { Notification } from '../notification';

export interface INotifiable {
  addNotification({ message, property }: Notification): void;
  addNotifications(notifications: Array<Notification>): void;
}