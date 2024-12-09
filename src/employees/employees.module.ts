import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { ContactInfo } from './entities/contact-info.entity';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries';
import { CommandsHandlers } from './commands';
import { EventHandlers } from './events';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ContactInfo, Employee]),
    CommonModule,
  ],
  controllers: [EmployeesController],
  providers: [...QueryHandlers, ...CommandsHandlers, ...EventHandlers],
})
export class EmployeesModule {}
