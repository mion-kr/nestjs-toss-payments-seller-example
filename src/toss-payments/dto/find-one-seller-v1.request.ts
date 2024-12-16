import { IsNotEmpty, IsString } from 'class-validator';

/**
 * 토스 셀러 조회 요청 DTO
 */
export class FindOneSellerV1Request {
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(params: { id: string }) {
    this.id = params.id;
  }
}
