import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './commands/create-employee/create-employee.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { GetEmployeeQuery } from './queries/get-employee/get-employee.query';
import { CreateEmployeeCommand } from './commands/create-employee/create-employee.command';
import { UpdateEmployeeCommand } from './commands/update-employee/update-employee.command';
import { UpdateEmployeeDto } from './commands/update-employee/update-employee.dto';
import { AssignManagerCommand } from './commands/assign-manager/assign-manager.command';
import { AssignManagerDto } from './commands/assign-manager/assign-manager.dto';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly CommandBus: CommandBus,
  ) {}
  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    const command = plainToClass(CreateEmployeeCommand, dto);
    const id = await this.CommandBus.execute(command);
    const query = plainToClass(GetEmployeeQuery, { id });
    return await this.queryBus.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = plainToClass(GetEmployeeQuery, { id: Number(id) });
    const employee = await this.queryBus.execute(query);
    if (!employee) throw new NotFoundException();
    return employee;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    const command = plainToClass(UpdateEmployeeCommand, {
      ...dto,
      id: Number(id),
    });

    const affected = await this.CommandBus.execute(command);
    if (!affected) throw new NotFoundException();

    const query = plainToClass(GetEmployeeQuery, { id });
    return await this.queryBus.execute(query);
  }

  @Patch(':id/assign-manager')
  async assingManager(@Param('id') id: string, @Body() dto: AssignManagerDto) {
    const command = plainToClass(AssignManagerCommand, {
      ...dto,
      id: Number(id),
    });

    const affected = await this.CommandBus.execute(command);
    if (!affected) throw new NotFoundException();

    const query = plainToClass(GetEmployeeQuery, { id });
    return await this.queryBus.execute(query);
  }
}
