import { ApiProperty } from '@nestjs/swagger';
export class IRegistrationStatus {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  message: string;
}
