import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInterfaceService<T> {

  constructor(
    private injector: Injector
  ) {
  }
  private http = this.injector.get(HttpClient);
  private authService = this.injector.get(AuthService);

  protected post(path: string, body: any, requireAuth = false, params?: any, ignoreURl = false, responseType = false, fullResponse = false): Observable<T> {
    return this.http.post<T>(ignoreURl ? path : `${environment.apiUrl}` + path, body, { params, headers: this.generateHeaders(requireAuth) });
  }

  protected put(path: string, body: any, requireAuth = false, params?: any, responseType = false): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}` + path, body, { params, headers: this.generateHeaders(requireAuth) });
  }

  protected patch(path: string, body: any, requireAuth = false, params?: any): Observable<T> {
    return this.http.patch<T>(`${environment.apiUrl}` + path, body, { params, headers: this.generateHeaders(requireAuth) });
  }


  protected get(path: string, requireAuth = false, params?: any, withCredentials?: boolean, responseType = false): Observable<T> {
    const options: {
      headers?: HttpHeaders,
      params?: HttpParams,
      responseType: any,
      withCredentials?: boolean
    } = {
      params,
      headers: this.generateHeaders(requireAuth) as HttpHeaders,
      responseType: responseType ? 'arraybuffer' as const : 'json',
      withCredentials
    };

    return this.http.get<T>(`${environment.apiUrl}` + path, options);
  }


  protected delete(path: string, requireAuth = false, params?: any, withCredentials?: boolean) {
    return this.http.delete(`${environment.apiUrl}` + path, { params, headers: this.generateHeaders(requireAuth), withCredentials });
  }


  protected generateHeaders(authHeaderRequired: boolean): HttpHeaders {
    let header = new HttpHeaders();

    if (authHeaderRequired) {
      const unparsedToken = this.authService.getJwtToken().toString();
      header = header.set('Authorization', "Bearer " + unparsedToken);
    }
    return header;
  }
}
