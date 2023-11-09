import { Notifiable } from "../validation/notifiable";

export abstract class ValueObject<Props> extends Notifiable {
  protected props: Props;

  constructor(props: Props) {
    super();
    this.props = props;
  }

  public equals(vo?: ValueObject<Props>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
} 