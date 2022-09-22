import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SolutionService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8000/';
  testSeverUrl = 'http://localhost:8001/';

  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  createSolution(code: string, testId: String) {
    return this.http.post(
      this.url,
      {
        code,
        test: testId,
      },
      { headers: this.headers }
    );
  }
}
