import { Type } from 'class-transformer';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BusinessTypes } from '../enum/toss-payments.enum';
import { AccountInfo } from './common/account';
import { CompanyInfo } from './common/company';
import { IndividualInfo } from './common/individual';

export class CreateSellerV1Request {
  /**
   * 오픈마켓 상점에서 발급하는 셀러의 고유 식별자
   * 연동 중에 참고할 수 있는 값
   * 등록 이후에 수정할 수 없고, 삭제된 셀러의 refSellerId는 다시 사용할 수 없음
   */
  @IsString()
  refSellerId: string;

  /**
   * 사업자 유형
   * INDIVIDUAL(개인), INDIVIDUAL_BUSINESS(개인사업자), CORPORATE(법인사업자) 중 하나
   */

  @IsEnum(BusinessTypes)
  businessType: BusinessTypes;

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
    refSellerId: string;
    businessType: BusinessTypes;
    account: AccountInfo;
    company?: CompanyInfo;
    individual?: IndividualInfo;
    metadata?: Record<string, string>;
  }) {
    const {
      refSellerId,
      businessType,
      account,
      company,
      individual,
      metadata,
    } = params;

    this.refSellerId = refSellerId;
    this.businessType = businessType;
    this.account = account;
    this.company = company;
    this.individual = individual;
    this.metadata = metadata;
  }
}
