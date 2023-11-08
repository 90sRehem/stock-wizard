import { ValueObject } from "./value-objects";

interface EmailProps {
  address: string;
}

export class Email extends ValueObject<EmailProps> {
  constructor(props: EmailProps) {
    super(props);
  }

  public get address() {
    return this.props.address;
  }
}
