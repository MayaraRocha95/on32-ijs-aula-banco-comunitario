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

    updateTask(id: string, titulo: string, descricao: string, status: 'ABERTO' | 'FEITA'): Task {
        const task = this.getTaskById(id);
        if (!task) {
            return null;
        }
        task.titulo = titulo;
        task.descricao = descricao;
        task.status = status;
        return task;
    }

    patchTask(id: string, updates: Partial<Task>): Task {
        const task = this.getTaskById(id);
        if (!task) {
            return null;
        }
       const camposAceitos = ['titulo', 'descricao', 'status'];
       Object.keys(updates).forEach((key) => {
        if(camposAceitos.includes(key)){
            task[key] = updates[key];
        }
       });
    }
}


