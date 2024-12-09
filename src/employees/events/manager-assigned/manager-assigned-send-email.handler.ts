import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { ManagerAssignedEvent } from './manager-assigned.event';
import { Employee } from 'src/employees/entities/employee.entity';

@EventsHandler(ManagerAssignedEvent)
export class ManagerAssigned_SendEmailHandler
  implements IEventHandler<ManagerAssignedEvent>
{
  constructor(private readonly dataSource: DataSource) {}

  async handle(event: ManagerAssignedEvent) {
    const manager = await this.dataSource.manager.findOne(Employee, {
      where: { id: event.managerId },
      relations: ['contactInfo'],
    });

    if (!manager.contactInfo?.email) return;

    const employee = await this.dataSource.manager.findOne(Employee, {
      where: { id: event.employeeId },
    });

    console.log(
      `Sending email to ${manager.name}, saying that ${employee.name} has joined their team.`,
    );
  }
}
