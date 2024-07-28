import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { Appointment, GetOccupiedSlots } from '@barba/core';

// Como toda a lógica ja foi implementada no AppointmentRepository, aqui vai chamar os metodos através de comportamentos.
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly repo: AppointmentRepository) {}
  @Post()
  create(@Body() appointment: Appointment) {
    return this.repo.create(appointment);
  }

  @Get(':email')
  searchEmail(@Param('email') email: string) {
    return this.repo.searchEmail(email);
  }
  @Get('occupancy/:professional/:date')
  getOccupancyByProfessionalAndDate(
    @Param('professional') professional: string,
    @Param('date') dateParam: string,
  ) {
    const useCase = new GetOccupiedSlots(this.repo);
    return useCase.execute(+professional, new Date(dateParam));
    // Aqui chama o caso de uso la do core, o GetOccupiedSlots e passa como parametro o profissional e a data que vieram nos parametros da URL.
  }
}
