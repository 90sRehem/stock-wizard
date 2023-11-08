import { Guid } from '@/core/value-objects/guid';
import { User, type UserProps } from './user';

const props: UserProps = { name: 'John Doe', email: "johndoe@email.com", password: "123456" };
const id = new Guid("123456");

describe('User', () => {
  it("should be able to create a user", () => {

    const user = new User(props, id);

    expect(user).toBeInstanceOf(User);
    expect(user.email).toEqual(props.email);
    expect(user.password).toEqual(props.password);
    expect(user.name).toEqual(props.name);
    expect(user.id.toString()).toBe(id.toString());
  });

  it('should create a new User instance without id', () => {

    const user = new User(props);
    console.log("🚀 ~ file: user.spec.ts:22 ~ it ~ user:", user)

    expect(user).toBeInstanceOf(User);
    expect(user.email).toEqual(props.email);
    expect(user.password).toEqual(props.password);
    expect(user.name).toEqual(props.name);
    expect(user.id).toBeInstanceOf(Guid);
    expect(user).toHaveProperty('id');
  });

  it('should be able to update a user', () => {
    const user = new User(props, id);
    const newProps = { name: "Jane Doe" };

    user.update(newProps);
    console.log("🚀 ~ file: user.spec.ts:35 ~ it ~ user:", user)

    expect(user.name).toEqual(newProps.name);
    expect(user.updatedAt).not.toBeNull();
  });
});