import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl=environment.apiUrl
  constructor(private http: HttpClient, private router: Router) {}
  logInValue: boolean = false;
  // Login
  login(data: any): Observable<any> {
    return this.http.post<{ idToken: string }>(
      `${this.apiUrl}/login`,
      data
    );
  }
  // Register
  register(data: any): Observable<any> {
    return this.http.post<{ idToken: string }>(
      `${this.apiUrl}/register`,
      data
    );
  }
  // Authontication for Menu
  isAuthentication(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }
  // only access login or register user show the hotals component
  canAccess() {
    if (!this.isAuthentication()) {
      this.router.navigate(['/login']);
    }
  }
  canAuthondicate() {
    if (this.isAuthentication()) {
      this.router.navigate(['/hotels']);
    }
  }
  removeuser() {
    localStorage.removeItem('token');
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
}
