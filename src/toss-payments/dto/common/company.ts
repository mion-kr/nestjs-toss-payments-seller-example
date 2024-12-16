import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CompanyInfo {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  representativeName: string;

  @IsString()
  @Length(10, 10)
  businessRegistrationNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  constructor(props: CompanyInfo) {
    Object.assign(this, props);
  }
}
