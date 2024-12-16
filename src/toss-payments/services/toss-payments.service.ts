import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';
import { firstValueFrom } from 'rxjs';
import { CreateSellerV1Request } from '../dto/create-seller-v1.request';
import { EditSellerV1Request } from '../dto/edit-seller-v1.request';
import { FindOneSellerV1Request } from '../dto/find-one-seller-v1.request';
import { RemoveSellerV1Request } from '../dto/remove-seller-v1.request';
import { ApiSellerResponse } from '../response/api.seller.response';
import { TossEncryptionService } from './toss-encryption.service';

@Injectable()
export class TossPaymentsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly tossEncryptionService: TossEncryptionService,
  ) {}

  /**
   * 셀러 등록
   * @param dto
   * @returns
   */
  async createSeller(dto: CreateSellerV1Request): Promise<ApiSellerResponse> {
    const context = `${TossPaymentsService.name}::${this.createSeller.name}`;

    try {
      const encryptedBody = await this.tossEncryptionService.encryptData(dto);

      const headers = await this.getHeader(true);
      const { data } = await firstValueFrom(
        this.httpService.post(
          'https://api.tosspayments.com/v2/sellers',
          encryptedBody,
          { headers: headers },
        ),
      );

      return await this.tossEncryptionService.decryptData(data);
    } catch (ex) {
      let errorCode = ex?.response?.data?.error?.code;
      let errorMessage = ex?.response?.data?.error?.message;

      if (ex?.response?.data) {
        const decryptedData = await this.tossEncryptionService.decryptData(
          ex?.response?.data,
        );
        errorCode = decryptedData?.error?.code;
        errorMessage = decryptedData?.error?.message;
      }

      const message = `[셀러 등록] dto:[${JSON.stringify(dto)}] / errorCode: [${errorCode}] / errorMessage: [${errorMessage}]`;

      Logger.error(message, ex?.stack, context);
      throw new InternalServerErrorException(message, context);
    }
  }

  /**
   * 셀러 상세 조회
   * @param dto
   * @returns
   */
  async findOneSeller(dto: FindOneSellerV1Request): Promise<ApiSellerResponse> {
    const context = `${TossPaymentsService.name}::${this.findOneSeller.name}`;

    try {
      const headers = await this.getHeader(true);

      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://api.tosspayments.com/v2/sellers/${dto.id}`,
          { headers: headers },
        ),
      );

      return await this.tossEncryptionService.decryptData(data);
    } catch (ex) {
      let errorCode = ex?.response?.data?.error?.code;
      let errorMessage = ex?.response?.data?.error?.message;

      if (ex?.response?.data) {
        const decryptedData = await this.tossEncryptionService.decryptData(
          ex?.response?.data,
        );
        errorCode = decryptedData?.error?.code;
        errorMessage = decryptedData?.error?.message;
      }

      const message = `[셀러 상세 조회] dto:[${JSON.stringify(dto)}] / errorCode: [${errorCode}] / errorMessage: [${errorMessage}]`;
      Logger.error(message, ex?.stack, context);
      throw new InternalServerErrorException(message, context);
    }
  }

  /**
   * 셀러 수정
   * @param dto
   * @returns
   */
  async editSeller(dto: EditSellerV1Request): Promise<ApiSellerResponse> {
    const context = `${TossPaymentsService.name}::${this.editSeller.name}`;

    try {
      const encryptedBody = await this.tossEncryptionService.encryptData(dto);

      const headers = await this.getHeader(true);
      const { data } = await firstValueFrom(
        this.httpService.post(
          `https://api.tosspayments.com/v2/sellers/${dto.id}`,
          encryptedBody,
          { headers: headers },
        ),
      );

      return await this.tossEncryptionService.decryptData(data);
    } catch (ex) {
      let errorCode = ex?.response?.data?.error?.code;
      let errorMessage = ex?.response?.data?.error?.message;

      if (ex?.response?.data) {
        const decryptedData = await this.tossEncryptionService.decryptData(
          ex?.response?.data,
        );
        errorCode = decryptedData?.error?.code;
        errorMessage = decryptedData?.error?.message;
      }

      const message = `[셀러 수정] dto:[${JSON.stringify(dto)}] / errorCode: [${errorCode}] / errorMessage: [${errorMessage}]`;
      Logger.error(message, ex?.stack, context);
      throw new InternalServerErrorException(message, context);
    }
  }

  /**
   * 셀러 삭제
   * @param dto
   * @returns
   */
  async removeSeller(dto: RemoveSellerV1Request): Promise<ApiSellerResponse> {
    const context = `${TossPaymentsService.name}::${this.removeSeller.name}`;

    try {
      const headers = await this.getHeader(true);
      const { data } = await firstValueFrom(
        this.httpService.delete(
          `https://api.tosspayments.com/v2/sellers/${dto.id}`,
          { headers: headers },
        ),
      );

      return await this.tossEncryptionService.decryptData(data);
    } catch (ex) {
      let errorCode = ex?.response?.data?.error?.code;
      let errorMessage = ex?.response?.data?.error?.message;

      if (ex?.response?.data) {
        const decryptedData = await this.tossEncryptionService.decryptData(
          ex?.response?.data,
        );
        errorCode = decryptedData?.error?.code;
        errorMessage = decryptedData?.error?.message;
      }

      const message = `[셀러 삭제] dto:[${JSON.stringify(dto)}] / errorCode: [${errorCode}] / errorMessage: [${errorMessage}]`;
      Logger.error(message, ex?.stack, context);
      throw new InternalServerErrorException(message, context);
    }
  }

  // TODO 셀러 목록 조회

  /**
   * 토스 페이먼트 API Header 반환
   * @param isEncryptionMode 암호화 모드 여부 @see https://docs.tosspayments.com/guides/v2/payouts#encryption-%EB%B3%B4%EC%95%88
   * @private
   */
  private async getHeader(
    isEncryptionMode = false,
  ): Promise<Record<string, string>> {
    const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY;
    const base64Encoding = Buffer.from(`${secretKey}:`).toString('base64');

    const headers: Record<string, string> = {
      Authorization: `Basic ${base64Encoding}`,
      'Content-Type': 'application/json',
    };

    if (isEncryptionMode) {
      headers['TossPayments-api-security-mode'] = 'ENCRYPTION';
      headers['Content-Type'] = 'text/plain';
    }

    return headers;
  }
}
