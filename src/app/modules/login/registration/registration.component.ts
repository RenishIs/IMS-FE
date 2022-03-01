import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TechnologyRequest } from 'src/models/request_models/technology';
import { UsersRequest } from 'src/models/request_models/user-request';
import { UsersRoleRequest } from 'src/models/request_models/user-roles';
import { BaseResponse } from 'src/models/response_models/base-response';
import { UsersResponse } from 'src/models/response_models/user-response';
import { CommanService } from 'src/shared/services/comman.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  rolesArray: UsersRoleRequest[] = [];
  interviewrId: string | undefined;
  technologyArray: TechnologyRequest[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commanService: CommanService,
    private loginService: LoginService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllTechnology();
    this.registrationFormInit();
  }

  registrationFormInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required]],
      technology: [[]],
    });

    this.registrationForm.get('role')?.valueChanges.subscribe(res => {
      if (res == this.interviewrId) {
        this.registrationForm.get('technology')?.addValidators([Validators.required]);
      } else {
        this.registrationForm.get('technology')?.clearValidators();
      }
      this.registrationForm.get('technology')?.updateValueAndValidity();
    });
  }

  getAllRoles() {
    this.commanService.getRolles().subscribe((res: BaseResponse<UsersRoleRequest[]>) => {
      if (res.success) {
        this.rolesArray = res.data;
        this.interviewrId = this.rolesArray.find((x: UsersRoleRequest) => x.role == 'recruiter')?._id;
      }
    });
  }

  getAllTechnology() {
    this.commanService.getTechnologies().subscribe((res: BaseResponse<TechnologyRequest[]>) => {
      if (res.success) {
        this.technologyArray = res.data;
      }
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  save() {
    let body: UsersRequest = this.registrationForm.value;
    this.loginService.postRegistration(body).subscribe((res: UsersResponse) => {
      if (res.success) {
        this.cancel();
      }
      this.snackbar.open(res.message, 'close', { duration: 2000 });
    });
  }
}
