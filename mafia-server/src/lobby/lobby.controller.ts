import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ILobby } from './interfaces/lobby.interface';

@ApiTags('lobby')
@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @ApiOperation({ summary: 'Lobby creation' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOkResponse({
    status: 201,
    description: 'Lobby created successfully',
    type: ILobby,
  })
  @Post()
  async create(@Body() createLobbyDto: CreateLobbyDto) {
    const lobby: ILobby = await this.lobbyService.create(createLobbyDto);
    if (!lobby) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    return lobby;
  }

  @ApiOperation({ summary: 'Find lobbies' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOkResponse({
    status: 200,
    description: 'List of lobbies',
    type: ILobby,
  })
  @Get()
  async findAll() {
    return await this.lobbyService.findAll();
  }

  @ApiOperation({ summary: 'Find lobby by ID' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOkResponse({
    status: 200,
    description: 'Lobby',
    type: ILobby,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const lobby: ILobby = await this.lobbyService.findOne(+id);
    if (!lobby) {
      throw new HttpException('Lobby not found', HttpStatus.NOT_FOUND);
    }
    return lobby;
  }

  @ApiOperation({ summary: 'Update lobby' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOkResponse({
    status: 200,
    description: 'Lobby updated',
    type: ILobby,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLobbyDto: UpdateLobbyDto,
  ) {
    return await this.lobbyService.update(+id, updateLobbyDto);
  }

  @ApiOperation({ summary: 'Delete lobby' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOkResponse({
    status: 200,
    description: 'Lobby deleted',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.lobbyService.remove(+id);
  }
}
