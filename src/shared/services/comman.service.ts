import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { TechnologyRequest } from 'src/models/request_models/technology';
import { UsersRoleRequest } from 'src/models/request_models/user-roles';
import { BaseResponse } from 'src/models/response_models/base-response';
import { ApiInterfaceService } from './api-interface.service';

@Injectable({
  providedIn: 'root'
})
export class CommanService extends ApiInterfaceService<any> {

  constructor(injector: Injector) {
    super(injector);
  }

  getRolles(): Observable<BaseResponse<UsersRoleRequest[]>> {
    return this.get('userRoles/');
  }

  getTechnologies(): Observable<BaseResponse<TechnologyRequest[]>> {
    return this.get('technology/');
  }
}
