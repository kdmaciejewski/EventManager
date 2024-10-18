import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterPostData, User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/all`);
  }

  public registerUser(newUser: RegisterPostData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/add`, newUser);
  }

  public updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/add`, updatedUser);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/delete/${userId}`);
  }

  public loginUser(email: string, password: string): Observable<User> {
    const loginData = { email, password };
    return this.http.post<User>(`${this.baseUrl}/user/login`, loginData);
  }
}
