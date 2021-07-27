import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginDto, UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  duration = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

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
        this.openSnackBar('Successfully logged in')
      }
    } catch (e) {
      console.error(e);
      this.openSnackBar(e.error);
    }
  }

  navigateToViewTodosPage() {
    this.router.navigate(['/todos']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(`${message}`, 'Close', {
      panelClass: 'my-custom-snackbar',
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
