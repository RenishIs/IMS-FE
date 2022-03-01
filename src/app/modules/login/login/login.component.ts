import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersRequest } from 'src/models/request_models/user-request';
import { UsersResponse } from 'src/models/response_models/user-response';
import { AuthService } from 'src/shared/services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackbar: MatSnackBar,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginFormInit();
  }

  loginFormInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]]
    });
  }

  signUp() {
    this.router.navigate(['login/registration']);
  }

  signIn() {
    const body: UsersRequest = this.loginForm.value;
    this.loginService.postLogin(body).subscribe((res: UsersResponse) => {
        if(res.success) {
          const data: any | UsersRequest = res.data;
          this.authService.setUserAndToken(data.token, data);
          this.router.navigate(['/dashboard']);
          this.authService.localStorageBehaviour.next(data.token);
        }
        this.snackbar.open(res.message, 'close', { duration: 2000 });
    });
  }
}
