import { IsNotEmpty, IsString } from 'class-validator';

/**
 * 토스 셀러 삭제 요청
 */
export class RemoveSellerV1Request {
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(partial: Partial<RemoveSellerV1Request>) {
    Object.assign(this, partial);
  }
}
