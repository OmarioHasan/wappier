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

  editUser(
    userId: string,
    userData: { name: string; country: string; birthday: number }
  ): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      `${environment.baseURL}/user/${userId}`,
      {
        name: userData.name,
        country: userData.country,
        birthday: +userData.birthday,
      }
    );
  }
  deleteUser(userId: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(
      `${environment.baseURL}/user/${userId}`
    );
  }
  deleteApp(userId: string, appId: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(
      `${environment.baseURL}/user/${userId}/app/${appId}`
    );
  }
}
