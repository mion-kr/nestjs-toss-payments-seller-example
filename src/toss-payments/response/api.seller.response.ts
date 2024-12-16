import { SellerV2Response } from './seller-v2.response';

/**
 * 토스페이먼츠 셀러 응답 객체
 * @see https://docs.tosspayments.com/reference#seller-객체
 */
export class ApiSellerResponse {
  /**
   * API 버전
   */
  version: string;

  /**
   * 토스페이먼츠에서 발급하는 API 요청의 고유 식별자
   */
  traceId: string;

  /**
   * 셀러 응답 객체
   */
  entityBody: SellerV2Response;
}
