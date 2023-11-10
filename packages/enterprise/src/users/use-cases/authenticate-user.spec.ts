import { inMemoryUserRepository } from "test/repositories/in-memory-user-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { UserFactory } from "test/factories/user-factory";
import { FakeHasher } from "test/cryptography/fake-hasher";

let sut: AuthenticateUserUseCase;
let repository: inMemoryUserRepository;
let encrypter: FakeEncrypter;
let hasher: FakeHasher;

describe('AuthenticateUser tests', () => {
  beforeEach(() => {
    repository = new inMemoryUserRepository();
    encrypter = new FakeEncrypter();
    hasher = new FakeHasher();
    sut = new AuthenticateUserUseCase(repository, hasher, encrypter);
  });

  it('should be able to authenticate a user', async () => {
    const email = "some@email.com";
    const hashedPassword = await hasher.hash("@T3ste")
    const user = UserFactory.make({ email, password: hashedPassword });

    await repository.create(user);

    const result = await sut.execute({
      email,
      password: "@T3ste"
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toHaveProperty("access_token");
  });

  it('should not be able to authenticate a user with invalid credentials', async () => {
    const user = UserFactory.make();

    await repository.create(user);

    const result = await sut.execute({
      email: user.email,
      password: "wrong-password"
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(Error);
  });
});