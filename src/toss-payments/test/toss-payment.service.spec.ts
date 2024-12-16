import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { AccountInfo } from '../dto/common/account';
import { CompanyInfo } from '../dto/common/company';
import { CreateSellerV1Request } from '../dto/create-seller-v1.request';
import { EditSellerV1Request } from '../dto/edit-seller-v1.request';
import { FindOneSellerV1Request } from '../dto/find-one-seller-v1.request';
import { RemoveSellerV1Request } from '../dto/remove-seller-v1.request';
import {
  BankCodeTypes,
  BusinessTypes,
  SellerStatusTypes,
} from '../enum/toss-payments.enum';
import { TossPaymentsService } from '../services/toss-payments.service';
import { TossPaymentsModule } from '../toss-payments.module';

jest.setTimeout(10 * 60 * 1000); // 10분
describe('TossPaymentsService', () => {
  let service: TossPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),

        TossPaymentsModule,
      ],
    }).compile();

    service = module.get<TossPaymentsService>(TossPaymentsService);
  });

  it('셀러 등록', async () => {
    const dto: CreateSellerV1Request = {
      refSellerId: uuid().replace(/-/g, '').substring(0, 20), // 20자리 고유 문자열 생성(UUID v4의 고유성은 여전히 유지 됨),
      businessType: BusinessTypes.INDIVIDUAL_BUSINESS,
      company: new CompanyInfo({
        businessRegistrationNumber: '4731502404', // '비즈노'에서 검색한 테스트용 사업자 번호 입니다.
        name: 'CU',
        representativeName: '테스터',
        email: 'test@gmail.com',
        phone: '01012345678',
      }),
      account: new AccountInfo({
        bankCode: BankCodeTypes.우리은행,
        accountNumber: '1002612980335', // 실제로 사용할 계좌번호를 입력합니다. 그렇지 않으면 오류가 발생 합니다.
        holderName: '홍길동',
      }),
      individual: null, // 개인 셀러 정보는 필수가 아니므로 null로 설정합니다.
    };

    const result = await service.createSeller(dto); // 현재 테스트에서는 계좌번호가 유효하지 않아 오류가 발생합니다.

    expect(result).toBeDefined();

    expect(result.entityBody).toEqual(
      expect.objectContaining({
        status: SellerStatusTypes.APPROVAL_REQUIRED,
        businessType: BusinessTypes.INDIVIDUAL_BUSINESS,
        company: {
          businessRegistrationNumber: '4731502404',
          name: 'CU',
          representativeName: '테스터',
          email: 'test@gmail.com',
          phone: '01012345678',
        },
        account: {
          accountNumber: '1002612980335',
          bankCode: '0' + BankCodeTypes.우리은행,
          holderName: '홍길동',
        },
      }),
    );
  });
  // TODO it('셀러 목록 조회', async () => {});
  it('셀러 조회', async () => {
    const dto: FindOneSellerV1Request = {
      id: '1234567890',
    };

    const result = await service.findOneSeller(dto);

    expect(result).toBeDefined();
  });
  it('셀러 수정', async () => {
    const dto: EditSellerV1Request = {
      id: '1234567890',
      account: new AccountInfo({
        bankCode: BankCodeTypes.우리은행,
        accountNumber: '1002612980335',
        holderName: '홍길동',
      }),
      company: new CompanyInfo({
        // 실제로 사용할 계좌번호를 입력합니다. 그렇지 않으면 오류가 발생 합니다.
        businessRegistrationNumber: '4731502404',
        name: 'CU',
        representativeName: '테스터',
        email: 'test@gmail.com',
        phone: '01012345678',
      }),
    };

    const result = await service.editSeller(dto); // 현재 테스트에서는 계좌번호가 유효하지 않아 오류가 발생합니다.

    expect(result).toBeDefined();

    expect(result.entityBody).toEqual(
      expect.objectContaining({
        status: SellerStatusTypes.APPROVAL_REQUIRED,
        businessType: BusinessTypes.INDIVIDUAL_BUSINESS,
        company: {
          businessRegistrationNumber: '4731502404',
          name: 'CU',
          representativeName: '테스터',
          email: 'test@gmail.com',
          phone: '01012345678',
        },
        account: {
          accountNumber: '1002639695337',
          bankCode: '0' + BankCodeTypes.우리은행,
          holderName: '김종윤',
        },
      }),
    );
  });
  it('셀러 삭제', async () => {
    const dto: RemoveSellerV1Request = {
      id: '1234567890',
    };

    const result = await service.removeSeller(dto);

    expect(result).toBeDefined();
  });
});
