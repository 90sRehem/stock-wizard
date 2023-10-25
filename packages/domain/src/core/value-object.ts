export abstract class ValueObject<Props> {
  protected constructor(props: Props) {
    this.props = props;
  }

  protected props: Props;

  public equals(vo?: ValueObject<Props>): boolean {
    if (vo === null || vo === undefined) return false;

    if (vo.props === undefined) return false;

    return JSON.stringify(vo.props) === JSON.stringify(this.props);
  }
}