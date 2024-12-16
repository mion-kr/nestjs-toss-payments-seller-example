import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { BankCodeTypes } from '../../enum/toss-payments.enum';

export class AccountInfo {
  @IsNotEmpty()
  @IsEnum(BankCodeTypes)
  bankCode: BankCodeTypes;

  @IsString()
  accountNumber: string;

  @IsString()
  @Length(1, 30, { message: '예금주명은 1-30자 사이여야 합니다' })
  holderName: string;

  constructor(props: AccountInfo) {
    Object.assign(this, props);
  }
}
