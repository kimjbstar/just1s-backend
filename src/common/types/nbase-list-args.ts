export class NBaseListArgs {
  constructor(obj?: object) {
    Object.assign(this, obj);
  }

  after?: number;

  take?: number;

  offset?: number;
}
