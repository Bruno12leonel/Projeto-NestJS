import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Meeting } from './entities/meeting.entity';
import { EmployeesModule } from './employees/employees.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Task, Meeting]),
    EmployeesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
