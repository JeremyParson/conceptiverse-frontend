import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthenticationResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8000/';
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  authenticate(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    return this.http.post<AuthenticationResponse>(
      `${this.url}auth`,
      body.toString(),
      { headers: this.headers }
    );
  }

  registerUser(email: string, username: string, password: string) {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('username', username);
    body.set('password', password);
    return this.http.post<User>(`${this.url}user`, body.toString(), {
      headers: this.headers,
    });
  }

  profileUser() {
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.url}auth/profile`, {
      headers: { ...this.headers, ['Authorization']: `Bearer ${token}` },
    });
  }

  signOutUser() {
    localStorage.removeItem('token');
  }
}
