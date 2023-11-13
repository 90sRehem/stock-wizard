import { HashGenerator } from "@/cryptography";
import { CreateUserUseCase } from "./create-user";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";
import { FakeHasher } from "@/test/cryptography/fake-hasher";
import { UserAlreadyExistsError, WrongCredentialsError } from "./errors";
import { ValidationError } from "./errors/validation-erros";

let sut: CreateUserUseCase;
let userRepository: InMemoryUserRepository;
let hashGenerator: HashGenerator;

describe("Create User", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hashGenerator = new FakeHasher();
    sut = new CreateUserUseCase(userRepository, hashGenerator);
  });

  it("should be able to create a new user", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "A1234",
    })
    expect(result.isSuccess()).toBeTruthy();
    expect(result.value).toEqual(userRepository.users[0])
  });

  it("should not be able to create a new user with an already used email", async () => {
    await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "A1234",
    })

    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "A1234",
    })

    expect(result.isFailure()).toBeTruthy();
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  });

  it("should not be able to create a new user with an invalid email", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "invalid-email",
      password: "A1234",
    })

    expect(result.isFailure()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ValidationError)
  });

  it("should not be able to create a new user with an invalid password", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "A",
    })

    expect(result.isFailure()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ValidationError)
  });

  it("should hash the user password", async () => {
    const hashedPassword = await hashGenerator.hash("A1234")
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "A1234",
    })

    expect(result.isSuccess()).toBeTruthy();
    expect(userRepository.users[0]).not.toBe("A1234")
    expect(userRepository.users[0].password).toBe(hashedPassword)
  });
});