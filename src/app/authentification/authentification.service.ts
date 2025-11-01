import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = 'https://deepshop-backend-1.onrender.com/api/deepinsta/auth';
  constructor(private http: HttpClient) { }
  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/authenticate`, credentials).pipe(
  //     catchError(err => {
  //       console.error('Login API error:', err);
  //       return throwError(() => err);
  //     })
  //   );
  // }
  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post('https://deepshop-backend-1.onrender.com/api/deepinsta/auth/authenticate', credentials).pipe(
  //     catchError(err => {
  //       console.error('Login API error:', err);
  //       return throwError(() => err);
  //     })
  //   );
  // }
  login(credentials: { email: string; psw: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials);
  }
  register(credentials: { email: string; psw: string, confirmationpsw: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }
  getEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getByEmail/${email}`);
  }
  getById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/getById/account/${id}`);
  }
  activateAccount(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/activate/account/${id}`);
  }
  sendEmailRP(email: string): Observable<any> {
    return this.http.post(`https://deepshop-backend-1.onrender.com/api/deepinsta/forgetPassword/request-reset/${email}`, { email });
  }
  verificationCode(email: any, credentials: { code: any }): Observable<any> {
    return this.http.post(`https://deepshop-backend-1.onrender.com/api/deepinsta/forgetPassword/verify-code/${email}`, credentials);
  }
  restPassword(email: any,  psw: string, confirmationpsw: string ): Observable<any> {
    return this.http.put(`https://deepshop-backend-1.onrender.com/api/deepinsta/forgetPassword/rest/Password/${email}`, { psw,confirmationpsw });
  }
  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
