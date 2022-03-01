import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import { LoaderService } from 'src/shared/services/loader.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private snackbar: MatSnackBar,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loaderService.show();
    const token = this.authService.getJwtToken();

    let changedReq;

    if (token) {
      const user = this.authService.getUser();
      changedReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          Id: user._id,
          Role: user.role
        },
      });

    } else {
      changedReq = request;
    }
    
    return next.handle(changedReq).pipe(catchError((err: HttpErrorResponse) => {
      this.loaderService.hide();
      if (err.status === 401) {
        this.authService.signOut();
        this.snackbar.open(`You can't be a hacker with our site.`, 'close', { duration: 4000 });
      }
      if (err.status === 0) {
        this.authService.signOut();
        this.snackbar.open(`Server may be down or not connected.`, 'close', { duration: 4000 });
      }
      return throwError(err);
    })).pipe(map<HttpEvent<any>, any>((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.loaderService.hide();
      }
      return event;
    }));

  }
  
}
