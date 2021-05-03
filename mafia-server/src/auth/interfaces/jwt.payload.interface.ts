import { ApiProperty } from '@nestjs/swagger';
export class IJwtPayload {
  @ApiProperty()
  username: string;
}
