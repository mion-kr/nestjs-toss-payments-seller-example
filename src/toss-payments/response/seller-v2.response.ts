import { AccountInfo } from '../dto/common/account';
import { CompanyInfo } from '../dto/common/company';
import { IndividualInfo } from '../dto/common/individual';
import { BusinessTypes, SellerStatusTypes } from '../enum/toss-payments.enum';

/**
 * 토스페이먼츠 셀러 응답 객체
 * @see https://docs.tosspayments.com/reference#seller-객체
 */
export interface SellerV2Response {
  /**
   * 토스페이먼츠에서 발급하는 셀러의 고유 식별자
   * 셀러 조회, 삭제, 지급대행 요청에 사용
   * 셀러의 상태 및 지급대행 상태가 바뀌어도 id는 바뀌지 않고, 삭제된 id는 다시 발급되지 않음
   * 최대 길이는 35자
   */
  id: string;

  /**
   * 오픈마켓 상점에서 직접 등록하는 셀러의 고유 식별자
   * 연동 중에 참고할 수 있는 값
   * 등록 이후에 수정할 수 없고, 삭제된 refSellerId는 다시 사용할 수 없음
   */
  refSellerId: string;

  /**
   * 사업자 유형
   * INDIVIDUAL(개인), INDIVIDUAL_BUSINESS(개인사업자), CORPORATE(법인사업자) 중 하나
   */
  businessType: BusinessTypes;

  /**
   * 법인사업자 또는 개인사업자 셀러 정보
   * businessType이 INDIVIDUAL_BUSINESS 또는 CORPORATE이면 필수
   */
  company?: CompanyInfo;

  /**
   * 개인 셀러 정보
   * businessType이 INDIVIDUAL이면 필수
   */
  individual?: IndividualInfo;

  /**
   * 셀러 상태
   * - APPROVAL_REQUIRED: 지급대행이 불가능한 상태. 개인 및 개인사업자 셀러 등록 직후의 상태이며, 본인인증이 필요
   * - PARTIALLY_APPROVED: 일주일 동안 1천만원까지 지급대행이 가능한 상태. 등록 직후의 법인사업자 셀러 또는 본인인증을 완료한 개인 및 개인사업자 셀러의 상태
   * - KYC_REQUIRED: 지급대행이 불가능한 상태. 일주일 동안 1천만원을 초과하는 금액을 지급 요청하면 셀러는 해당 상태로 변경. 셀러가 KYC 심사를 완료해야 함
   * - APPROVED: 금액 제한 없이 지급대행이 가능한 상태. KYC 심사가 정상적으로 완료된 셀러의 상태
   */
  status: SellerStatusTypes;

  /**
   * 셀러가 정산 금액을 지급받을 계좌 정보
   */
  account: AccountInfo;

  /**
   * 셀러와 관련된 추가 정보를 key-value 쌍으로 담는 객체
   * 최대 5개의 키-값 쌍
   * 키: [ , ] 를 사용하지 않는 최대 40자의 문자열
   * 값: 최대 500자의 문자열
   */
  metadata?: Record<string, string>;
}
