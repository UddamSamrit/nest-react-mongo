import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(taskDto: any): Promise<Task> {
    const newTask = new this.taskModel(taskDto);
    return await newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string) {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, taskDto: any): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, taskDto, { new: true });
  }

  remove(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
