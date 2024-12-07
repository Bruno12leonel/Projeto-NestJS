import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ContactInfoDto {
  @Expose()
  email?: string;

  @Expose()
  phone?: string;
}
