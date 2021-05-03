import { ApiProperty } from '@nestjs/swagger';

export class IJwtToken {
  @ApiProperty()
  expiresIn: string;
  @ApiProperty()
  accessToken: string;
}

export class ILoginStatus {
  @ApiProperty()
  username: string;
  @ApiProperty()
  expiresIn: string;
  @ApiProperty()
  accessToken: string;
}
