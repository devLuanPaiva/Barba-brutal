import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { Appointment, GetOccupiedSlots, User } from '@barba/core';
import { UserLogged } from 'src/user/user.decorator';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly repo: AppointmentRepository) {}
  @Post()
  create(@Body() appointment: Appointment, @UserLogged() userLogged: User) {
    if (appointment.user.id !== userLogged.id) {
      throw new HttpException('Usuário não autorizado', 401);
    }
    return this.repo.create(appointment);
  }

  @Get('/:email/:date')
  searchEmail(@Param('email') email: string, @Param('date') dateParam: string) {
    return this.repo.searchEmail(email, new Date(dateParam));
  }
  @Get('occupancy/:professional/:date')
  getOccupancyByProfessionalAndDate(
    @Param('professional') professional: string,
    @Param('date') dateParam: string,
  ) {
    const useCase = new GetOccupiedSlots(this.repo);
    return useCase.execute(+professional, new Date(dateParam));
  }

  @Get(':professional/:date')
  searchProfessionalAndDate(
    @Param('professional') professional: string,
    @Param('date') dateParam: string,
  ) {
    return this.repo.searchProfessionalAndDate(
      +professional,
      new Date(dateParam),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @UserLogged() userLogged: User) {
    if (!userLogged) {
      throw new HttpException('Usuário não está logado', 401);
    }
    await this.repo.delete(+id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() appointment: Partial<Appointment>,
    @UserLogged() userLogged: User,
  ) {
    if (!userLogged) {
      throw new HttpException('Usuário não está logado', 401);
    }
    await this.repo.update(id, appointment);
  }
}
