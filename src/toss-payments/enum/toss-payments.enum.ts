/**
 * 사업자 유형
 */
export enum BusinessTypes {
  INDIVIDUAL = 'INDIVIDUAL',
  INDIVIDUAL_BUSINESS = 'INDIVIDUAL_BUSINESS',
  CORPORATE = 'CORPORATE',
}

export enum BankCodeTypes {
  경남은행 = 39,
  광주은행 = 34,
  교보증권 = 261,
  단위농협 = 12,
  대신증권 = 267,
  메리츠증권 = 287,
  미래에셋증권 = 238,
  부국증권 = 290,
  부산은행 = 32,
  삼성증권 = 240,
  새마을금고 = 45,
  산림조합 = 64,
  신영증권 = 291,
  신한금융투자 = 278,
  신한은행 = 88,
  신협 = 48,
  씨티은행 = 27,
  우리은행 = 20,
  우체국예금보험 = 71,
  유안타증권 = 209,
  유진투자증권 = 280,
  저축은행중앙회 = 50,
  전북은행 = 37,
  제주은행 = 35,
  카카오뱅크 = 90,
  카카오페이증권 = 288,
  케이뱅크 = 89,
  토스뱅크 = 92,
  토스증권 = 271,
  펀드온라인코리아 = 294,
  하나금융투자 = 270,
  하나은행 = 81,
  하이투자증권 = 262,
  한국투자증권 = 243,
  한화투자증권 = 269,
  현대차증권 = 263,
  홍콩상하이은행 = 54,
  DB금융투자 = 279,
  DGB대구은행 = 31,
  IBK기업은행 = 3,
  KB국민은행 = 4,
  KB증권 = 218,
  KDB산업은행 = 2,
  KTB투자증권 = 227,
  LIG투자증권 = 292,
  NH농협은행 = 11,
  NH투자증권 = 247,
  SC제일은행 = 23,
  Sh수협은행 = 7,
  SK증권 = 266,
}

/**
 * 셀러 상태
 * - APPROVAL_REQUIRED: 지급대행이 불가능한 상태. 개인 및 개인사업자 셀러 등록 직후의 상태이며, 본인인증이 필요
 * - PARTIALLY_APPROVED: 일주일 동안 1천만원까지 지급대행이 가능한 상태. 등록 직후의 법인사업자 셀러 또는 본인인증을 완료한 개인 및 개인사업자 셀러의 상태
 * - KYC_REQUIRED: 지급대행이 불가능한 상태. 일주일 동안 1천만원을 초과하는 금액을 지급 요청하면 셀러는 해당 상태로 변경. 셀러가 KYC 심사를 완료해야 함
 * - APPROVED: 금액 제한 없이 지급대행이 가능한 상태. KYC 심사가 정상적으로 완료된 셀러의 상태
 */
export enum SellerStatusTypes {
  APPROVAL_REQUIRED = 'APPROVAL_REQUIRED',
  PARTIALLY_APPROVED = 'PARTIALLY_APPROVED',
  KYC_REQUIRED = 'KYC_REQUIRED',
  APPROVED = 'APPROVED',
}
