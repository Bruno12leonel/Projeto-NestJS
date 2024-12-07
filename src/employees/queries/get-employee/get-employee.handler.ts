import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Employee } from 'src/employees/entities/employee.entity';
import { DataSource } from 'typeorm';
import { EmployeeDto } from './employee.dto';
import { GetEmployeeQuery } from './get-employee.query';

@QueryHandler(GetEmployeeQuery)
export class GetEmployeeQueryHandler
  implements IQueryHandler<GetEmployeeQuery, EmployeeDto | null>
{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async execute(query: GetEmployeeQuery): Promise<EmployeeDto | null> {
    const data = await this.dataSource.manager.find(Employee, {
      where: { id: query.id },
      relations: ['contactInfo'],
    });

    if (!data.length) return null;

    return plainToClass(EmployeeDto, data[0]);
  }
}
