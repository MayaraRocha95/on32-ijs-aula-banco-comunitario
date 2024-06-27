import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  
    private tasks: Task[] = [];

    createTask(titulo: string, descricao: string): Task {
        const newTask = new Task(titulo, descricao);
        this.tasks.push(newTask);
        return newTask;
    }

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }
    deleteTaskById(id: string): boolean {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;

        // this.tasks = this.tasks.filter((task) => task.id !== id);
    }
}
