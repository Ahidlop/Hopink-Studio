import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable }  from 'rxjs';

export interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
  user?: { id:number; name:string; email:string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost/hopink-api';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.api}/register.php`, user,
      { withCredentials: true }
    );
  }

  login(creds: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.api}/login.php`, creds,
      { withCredentials: true }
    );
  }

  getUser(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.api}/getUser.php`,
      { withCredentials: true }
    );
  }

  logout(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.api}/logout.php`,
      { withCredentials: true }
    );
  }
}
