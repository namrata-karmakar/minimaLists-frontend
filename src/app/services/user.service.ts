import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(userCredentials: LoginDto): Promise<UserDataDto> {
    return this.http.post<UserDataDto>(`${environment.USER}/login`, userCredentials).toPromise();
  }

  signup(signupData: SignupDto): Promise<string> {
    return this.http.post<string>(`${environment.USER}/signup`, signupData).toPromise();
  }
}

export type LoginDto = {
  username: string;
  password: string;
}

export type UserDataDto = {
  token: string;
  userID: string
}

export type SignupDto = {
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  termsAndConditions: boolean;
}