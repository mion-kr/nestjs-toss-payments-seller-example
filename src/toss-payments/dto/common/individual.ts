import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class IndividualInfo {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  constructor(props: IndividualInfo) {
    Object.assign(this, props);
  }
}
