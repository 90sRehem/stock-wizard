import { Entity, Guid } from 'enterprise';

export type AccessTokenProps = {
  token: string;
  userId: string;
};

export class AccessToken extends Entity<AccessTokenProps> {
  constructor(props: AccessTokenProps, id?: Guid) {
    super(props, id);
  }
  get token(): string {
    return this.props.token;
  }

  get userId(): string {
    return this.props.userId;
  }
}
