import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersRequest } from 'src/models/request_models/user-request';
import { UsersResponse } from 'src/models/response_models/user-response';
import { ApiInterfaceService } from 'src/shared/services/api-interface.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiInterfaceService<UsersResponse> {

  constructor(injector: Injector) {
    super(injector);
  }


  postRegistration(body: UsersRequest): Observable<UsersResponse> {
    return this.post('user/signup', body);
  }

  postLogin(body: UsersRequest): Observable<UsersResponse> {
    return this.post('user/login', body);
  }

}
