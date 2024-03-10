import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponseGetInfoUserI, UpdateUserProfileI } from '../interfaces/user-profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  // Variables
  urlApi = environment.URL_API;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Access-Control-Request-Header': 'Content-type',
    'Access-Control-Allow-Origin': '*'
  });
  options = {}

  // Constructor
  constructor(
    private http: HttpClient,
  ) { }

  //Método que consume el servicio para obtener la información del usuario
  getInfoUser(headers: Map<string, any>): Observable<ApiResponseGetInfoUserI> {
    this.options = this.getHeaders(headers);
    return this.http.get<ApiResponseGetInfoUserI>(this.urlApi + `/api/users/me`, this.options);
  }

  //Método que consume el servicio para actualizar el perfil del usuario
  editInfoUser(headers: Map<string, any>, body: UpdateUserProfileI): Observable<any> {
    this.options = this.getHeaders(headers);
    return this.http.put<any>(this.urlApi + `/api/users/me`, body, this.options);
  }

  //Método que obtiene los headers
  public getHeaders(headers: Map<string, any> | undefined) {
    if (headers != null) {
      headers.forEach((value, key) => {
        if (this.headers.has(key))
          this.headers = this.headers.delete(key);
        this.headers = this.headers.append(key, value || '');
      });
    }
    this.headers = this.headers.delete('Authorization');
    this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    this.options = { headers: this.headers };
    return this.options;
  }
}
