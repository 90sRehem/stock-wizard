import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";
import { FindUserByEmailUseCase } from "./find-user-by-email";
import { UserFactory } from "@/test";
import { UserNotFoundError } from "./errors";

let sut: FindUserByEmailUseCase;
let userRepository: InMemoryUserRepository;

describe("Find User By Email", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new FindUserByEmailUseCase(userRepository);
  });

  it("should be able to find a user by email", async () => {
    const user = UserFactory.make({
      name: "John Doe",
      email: "johndoe@email.com"
    })

    userRepository.users.push(user);

    const result = await sut.execute({
      email: user.email
    })

    expect(result.isSuccess()).toBeTruthy();
    expect(result.value).toEqual(user)
  });

  it("should not be able to find a user by email if it does not exist", async () => {
    const result = await sut.execute({
      email: "non-existing-email"
    })

    expect(result.isFailure()).toBeTruthy();
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  });
});