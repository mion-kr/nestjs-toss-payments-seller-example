import { Injectable } from '@nestjs/common/decorators';

import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { JWE, JWK } from 'node-jose';
import { v4 as uuid } from 'uuid';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class TossEncryptionService {
  private readonly format = 'compact';
  private readonly zip = 'DEF';
  private readonly alg = 'dir';
  private readonly enc = 'A256GCM';
  private readonly utcAsiaSeoul = 9;

  /**
  /**
   * 데이터 암호화
   */
  async encryptData(data: any): Promise<string> {
    const key = await this.getJweKey();
    const payload = Buffer.from(JSON.stringify(data), 'utf-8');
    const iat = dayjs()
      .utc()
      .utcOffset(this.utcAsiaSeoul)
      .format('YYYY-MM-DDTHH:mm:ssZ');
    const nonce = uuid();

    const jwe = await JWE.createEncrypt(
      {
        format: this.format,
        zip: this.zip,
        fields: { alg: this.alg, enc: this.enc, iat, nonce },
      },
      key,
    )
      .update(payload)
      .final();

    return jwe;
  }

  /**
   * 데이터 복호화
   */
  async decryptData(data: string): Promise<any> {
    const key = await this.getJweKey();
    const jwe = await JWE.createDecrypt(key).decrypt(data);
    const decryptedData = Buffer.from(jwe?.payload, 'utf-8').toString();
    return JSON.parse(decryptedData);
  }

  private async getJweKey(): Promise<JWK> {
    const { encryptionKey } = this.getEncryptKey();
    const byteKey = Buffer.from(encryptionKey, 'hex');
    return await JWK.asKey({
      kty: 'oct',
      k: byteKey.toString('base64'),
    });
  }

  private getEncryptKey() {
    return {
      encryptionKey: process.env.TOSS_PAYMENTS_ENCRYPTION_KEY,
    };
  }
}
