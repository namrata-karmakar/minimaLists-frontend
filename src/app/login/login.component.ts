import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginDto, LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  duration: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
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
      const response = await this.loginService.login(
        this.loginFormGroup.value as LoginDto
      );
      const { token, userID } = response;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userID', userID);
      if (token) {
        sessionStorage.setItem('isLoggedIn', 'true');
        this.navigateToViewTodosPage();
        this.openSnackBar('Successfully logged in');
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
