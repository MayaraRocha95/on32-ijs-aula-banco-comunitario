import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

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
            statusCode: HttpStatus.OK,
            message: 'Task deletada com sucesso',
        };
    }
}
