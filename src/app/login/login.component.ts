import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto, UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  hide = true;

  loginFormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
      ],
    ],
  });

  ngOnInit(): void { }

  async onSubmit() {
    try {
      const response = await this.userService.login(
        this.loginFormGroup.value as LoginDto
      );
      const { token, userID } = response;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userID', userID);
      if (token) {
        this.navigateToViewTodosPage();
      }
    } catch (e) {
      console.error(e);
    }
  }

  navigateToViewTodosPage() {
    this.router.navigate(['/view-todos-page']);
  }

}
