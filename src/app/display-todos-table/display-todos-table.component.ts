import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { TodosDataDto, TodosService } from '../services/todos.service';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-display-todos-table',
	templateUrl: './display-todos-table.component.html',
	styleUrls: ['./display-todos-table.component.css']
})
export class DisplayTodosTableComponent implements OnChanges {

	columnsToDisplay: string[] = ['todos', 'status', 'editButton', 'deleteButton'];
	@Input() randomNumber: number = 0;
	dataSource: TodosDataDto[] = [];

	constructor(private todosService: TodosService, private dialog: MatDialog) { }

	ngOnChanges(): void {
		this.getTodos();
	}

	async getTodos() {
		const userID: string | null = sessionStorage.getItem("userID");
		this.dataSource = await this.todosService.getTodosByUserId(userID);
		this.dataSource = this.dataSource.reverse();
	}

	openDeleteTodoConfirmDialog() {
		let dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
			height: '400px',
			width: '600px',
		})
	}

	async deleteTodo(todo: any): Promise<void> {
		const { _id } = todo;
		await this.todosService.deleteTodoById(_id);
		await this.getTodos();
	}
}
