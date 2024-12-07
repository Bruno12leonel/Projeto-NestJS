import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreatContactInfoDto {
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  managerId?: number;

  @IsOptional()
  @ValidateNested()
  contactInfor?: CreatContactInfoDto;
}
