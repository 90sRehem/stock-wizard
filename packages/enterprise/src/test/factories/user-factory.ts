import { Guid } from "@/core";
import { Password, User } from "@/users";
import { faker } from "@faker-js/faker"

export class UserFactory {
  static make(overrides: Partial<User> = {}, id?: Guid) {
    const user = new User({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      ...overrides,
    }, id);

    return user;
  }
}