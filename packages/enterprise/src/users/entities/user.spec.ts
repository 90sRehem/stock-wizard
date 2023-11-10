import { Guid } from '@/core/value-objects/guid';
import { User, type UserProps } from './user';

const id = new Guid("123456");
const props: UserProps = {
  name: "John Doe",
  email: "johndoe@email.com",
  password: "@T3ste"
};

describe('User', () => {
  it("should be able to create a user", () => {
    const user = new User(props, id);
    expect(user.isValid()).toBeTruthy();
  });

  it('should create a new User instance without id', () => {
    const user = new User(props);
    expect(user.isValid()).toBeTruthy();
    expect(user).toHaveProperty('id');
  });

  it('should be able to update a user', () => {
    const user = new User(props, id);
    const newProps = { name: "Jane Doe" };
    user.update(newProps);
    expect(user.isValid()).toBeTruthy();
    expect(user.name).toEqual(newProps.name);
    expect(user.updatedAt).not.toBeNull();
  });
});