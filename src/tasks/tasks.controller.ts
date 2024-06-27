import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post("criar")
    createTask(@Body() body: { titulo: string; descricao: string }) {
        const task = this.tasksService.createTask(body.titulo, body.descricao);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Task criada com sucesso',
            data: task,
        }
    }

    @Get()
    getAllTasks() {
        const tasks = this.tasksService.getAllTasks();
        return {
            statusCode: HttpStatus.OK,
            message: 'Lista de tasks',
            data: tasks,
        }
    }
    @Get(':id')
    getTaskById(@Param('id') id: string) {
        const task = this.tasksService.getTaskById(id);
        if (!task) {
            throw new HttpException('Task não encontrada', HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Task encontrada',
            data: task,
        }
    }
    // crie um metodo de deletar task
    @Delete(':id')
    deleteTaskById(@Param('id') id: string) {
        const task = this.tasksService.getTaskById(id);
        if (!task) {
            throw new HttpException('Task não encontrada', HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'Task deletada com sucesso',
        };
    }

    @Put(':id')
    updateTask(
        @Param('id') id: string,
        @Body() body: { titulo: string; descricao: string; status: 'ABERTO' | 'FEITA' },
    ) {
        const task = this.tasksService.updateTask(id, body.titulo, body.descricao, body.status);

        if (!task) {
            throw new HttpException('Task não encontrada', HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Task atualizada com sucesso',
            data: task,
        }
    }

    @Patch('/edit/:id')
    patchtask(
        @Param('id') id: string,
        @Query() updates: Partial<Task>,
    ) {
        const task = this.tasksService.patchTask(id, updates);
        return {
            statusCode: HttpStatus.OK,
            message: 'Task atualizada com sucesso',
            data: task,
        }
    }


}
