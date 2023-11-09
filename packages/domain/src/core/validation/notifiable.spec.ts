import { z } from "zod";
import { Notifiable } from "./notifiable";
import { Notification } from "./notification";
import { Contract } from "./contract";

class NotifiableClass extends Notifiable {
  constructor() {
    super();
  }
}

describe("Notifiable", () => {
  let notifiable: NotifiableClass;

  beforeEach(() => {
    notifiable = new NotifiableClass();
  });

  it("should add a notification to the list of notifications", () => {
    notifiable.addNotification("property", "message");
    expect(notifiable.notifications).toHaveLength(1);
    expect(notifiable.notifications[0]).toBeInstanceOf(Notification);
  });

  it("should add a Notification object to the list of notifications", () => {
    const notification = new Notification("property", "message");
    notifiable.addNotification(notification);
    expect(notifiable.notifications).toHaveLength(1);
    expect(notifiable.notifications[0]).toBe(notification);
  });

  it("should add notifications from a Contract object to the list of notifications", () => {
    const schema = z.object({
      name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
      email: z.string().email('O e-mail informado é inválido'),
    })

    const contract = new Contract(schema, { email: "", name: "", });

    notifiable.addNotifications(contract.notifications);
    expect(notifiable.notifications).toHaveLength(2);
  });

  it("should add multiple notifications to the list of notifications", () => {
    const notifications = [
      new Notification("property1", "message1"),
      new Notification("property2", "message2"),
    ];

    notifiable.addNotifications(notifications);

    expect(notifiable.notifications).toHaveLength(2);
    expect(notifiable.notifications[0]).toBe(notifications[0]);
    expect(notifiable.notifications[1]).toBe(notifications[1]);
  });

  it("should be valid when there are no notifications", () => {
    expect(notifiable.isValid()).toBe(true);
  });

  it("should be invalid when there are notifications", () => {
    notifiable.addNotification("property1", "message1");
    expect(notifiable.isInvalid()).toBe(true);
  });
});