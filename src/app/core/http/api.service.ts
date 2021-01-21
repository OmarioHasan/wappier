import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersResponse, UserResponse } from '@modules/users/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${environment.baseURL}/user`);
  }

  getUser(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.baseURL}/user/${id}`);
  }

  addApp(userId: string, appName, appIcon): Observable<UserResponse> {
    console.log('appIcon ', appIcon);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':
          'multipart/form-data; boundary=----WebKitFormBoundaryOrVhivHlll6zPi0p',
      }),
    };
    return this.http.post<UserResponse>(
      `${environment.baseURL}/user/${userId}/app`,
      { app: appName, icons: appIcon },
      httpOptions
    );
  }
  editApp(
    userId: string,
    appId: string,
    appName: string
  ): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      `${environment.baseURL}/user/${userId}/app/${appId}`,
      { app: appName }
    );
  }
  deleteApp(userId: string, appId: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(
      `${environment.baseURL}/user/${userId}/app/${appId}`
    );
  }
}
