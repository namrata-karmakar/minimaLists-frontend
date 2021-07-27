import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable()
export class TodosService {

  constructor(private http: HttpClient) { }

  addTodo(todoData: TodosDataDto) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-token-header': `${sessionStorage.getItem("token")}`
      })
    };
    return this.http.post(`${environment.TODO}`, todoData, httpOptions).toPromise();
  }

  getTodosByUserId(userID: string | null): Promise<TodosDataDto[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-token-header': `${sessionStorage.getItem("token")}`
      })
    };
    return this.http.get<TodosDataDto[]>(`${environment.TODO}/user/${userID}`, httpOptions).toPromise();
  }

  deleteTodoById(_id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-token-header': `${sessionStorage.getItem("token")}`
      })
    };
    this.http.delete(`${environment.TODO}/id/${_id}`, httpOptions).toPromise();
  }
}

export type TodoDto = {
  todo: string;
  status: string;
}

export type TodosDataDto = {
  _id: string;
  createdOn: string;
  todo: string;
  status: string;
  userID: string;
}