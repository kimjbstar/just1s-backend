import { ApiProperty } from "@nestjs/swagger";

export class NbaseListResult {
  constructor(obj?: object) {
    Object.assign(this, obj);
  }

  @ApiProperty({
    description:
      "페이징을 적용하지 않은 총 갯수입니다. 페이지네이션 등에 사용힙니다."
  })
  totalCount?: number;

  @ApiProperty({
    description: "다음 페이지네이션 데이터가 있는지 여부입니다."
  })
  hasNext?: boolean;
}
