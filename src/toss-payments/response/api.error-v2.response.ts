/**
 * 토스페이먼츠 API v2 에러 응답 객체
 * @see https://docs.tosspayments.com/reference/using-api/req-res#api-v2-%EC%97%90%EB%9F%AC-%EA%B0%9D%EC%B2%B4
 */
export interface ApiTossPaymentsV2ErrorResponse {
  /**
   * API 버전
   */
  version: string;

  /**
   * 토스페이먼츠에서 발급하는 API 요청의 고유 식별자
   */
  traceId: string;

  /**
   * 에러 객체
   */
  error: {
    code: string;
    message: string;
  };
}
