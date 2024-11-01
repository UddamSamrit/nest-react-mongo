import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:Nest2020@mongo:27017/nest_db?authSource=admin',
    ),
    UsersModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
