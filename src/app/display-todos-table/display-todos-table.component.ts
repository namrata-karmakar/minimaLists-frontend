import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { TodosDataDto, TodosService } from '../services/todos.service';
import { MatTable } from '@angular/material/table';

@Component({
	selector: 'app-display-todos-table',
	templateUrl: './display-todos-table.component.html',
	styleUrls: ['./display-todos-table.component.css']
})
export class DisplayTodosTableComponent implements OnChanges {

	columnsToDisplay: string[] = ['todos', 'status', 'editButton', 'deleteButton'];
	@Input() randomNumber: number = 0;
	@ViewChild(MatTable) table!: MatTable<any>
	dataSource: TodosDataDto[] = [];

	constructor(private todosService: TodosService) { }

	ngOnChanges(): void {
		this.getTodos();
		this.table.renderRows();
	}

	async getTodos() {
		const userID: string | null = sessionStorage.getItem("userID");
		console.log(userID);
		this.dataSource = await this.todosService.getTodosByUserId(userID);
		this.table.renderRows();
		this.dataSource = this.dataSource.reverse();
	}

	async deleteTodo(todo: any): Promise<void> {
		const { _id, userID } = todo;
		await this.todosService.deleteTodoById(_id);
		this.dataSource = await this.todosService.getTodosByUserId(userID);
		this.table.renderRows();
	}
}
