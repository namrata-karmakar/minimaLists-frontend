import { Component, Input, OnChanges } from '@angular/core';
import { TodosDataDto, TodosService } from '../services/todos.service';

@Component({
  selector: 'app-display-todos-table',
  templateUrl: './display-todos-table.component.html',
  styleUrls: ['./display-todos-table.component.css']
})
export class DisplayTodosTableComponent implements OnChanges {

  @Input() randomNumber: number = 0;

  constructor(private todosService: TodosService) { }

  ngOnChanges(): void {
    this.getTodos();
  }

  dataSource: TodosDataDto[] = [];
  async getTodos() {
    const userID: string | null = sessionStorage.getItem("userID");
    console.log(userID);
    this.dataSource = await this.todosService.getTodosByUserID(userID);
    this.dataSource = this.dataSource.reverse();
  }

  columnsToDisplay: string[] = ['todos', 'status', 'editButton', 'deleteButton'];
}
