import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { ContactInfo } from './entities/contact-info.entity';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries';
import { CommandsHandlers } from './commands';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ContactInfo, Employee])],
  controllers: [EmployeesController],
  providers: [...QueryHandlers, ...CommandsHandlers],
})
export class EmployeesModule {}
