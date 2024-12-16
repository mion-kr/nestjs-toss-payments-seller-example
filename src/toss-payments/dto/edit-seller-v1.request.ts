import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AccountInfo } from './common/account';
import { CompanyInfo } from './common/company';
import { IndividualInfo } from './common/individual';

export class EditSellerV1Request {
  @IsString()
  @IsNotEmpty()
  id: string;

  /**
   * 법인사업자 또는 개인사업자 셀러 정보
   * businessType이 INDIVIDUAL_BUSINESS 또는 CORPORATE이면 필수
   */
  @ValidateNested()
  @Type(() => CompanyInfo)
  @IsOptional()
  company?: CompanyInfo;

  /**
   * 개인 셀러 정보
   * businessType이 INDIVIDUAL이면 필수
   */
  @ValidateNested()
  @Type(() => IndividualInfo)
  @IsOptional()
  individual?: IndividualInfo;

  /**
   * 셀러가 정산 금액을 지급받을 계좌 정보
   */
  @ValidateNested()
  @Type(() => AccountInfo)
  account: AccountInfo;

  /**
   * 셀러와 관련된 추가 정보를 key-value 쌍으로 담는 객체
   * 최대 5개의 키-값 쌍
   * 키: [ , ] 를 사용하지 않는 최대 40자의 문자열
   * 값: 최대 500자의 문자열
   */
  @IsObject()
  @IsOptional()
  metadata?: Record<string, string>;

  constructor(params: {
    id: string;
    account: AccountInfo;
    company?: CompanyInfo;
    individual?: IndividualInfo;
    metadata?: Record<string, string>;
  }) {
    const { id, account, company, individual, metadata } = params;

    this.id = id;
    this.account = account;
    this.company = company;
    this.individual = individual;
    this.metadata = metadata;
  }
}
