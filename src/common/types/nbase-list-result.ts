export class NbaseListResult {
  constructor(obj?: object) {
    Object.assign(this, obj);
  }

  totalCount?: number;

  hasNext?: boolean;
}
