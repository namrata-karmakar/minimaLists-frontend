import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar/';
import { SignupDto, UserService } from '../services/user.service';
import { dateOfBirthValidator } from '../validations/dateOfBirthValidator';
import { passwordsMatchValidator } from '../validations/passwordsMatchValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private _snackBar: MatSnackBar
  ) { }

  signupFormGroup = this.formBuilder.group(
    {
      username: ['', [Validators.email, Validators.required]],
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
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
        ],
      ],
      dob: ['', [Validators.required, dateOfBirthValidator()]],
      tnc: ['', Validators.requiredTrue],
    },
    {
      validators: passwordsMatchValidator,
    }
  );

  get username(): FormControl {
    return this.signupFormGroup.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.signupFormGroup.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.signupFormGroup.get('confirmPassword') as FormControl;
  }

  get dob(): FormControl {
    return this.signupFormGroup.get('dob') as FormControl;
  }

  get tnc(): FormControl {
    return this.signupFormGroup.get('tnc') as FormControl;
  }

  ngOnInit(): void { }

  async onSubmit() {
    try {
      await this.userService.signup(this.signupFormGroup.value as SignupDto);
    } catch (e) {
      console.error(e);
    }
  }

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}

