import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Results, Solution, Test } from 'src/app';

@Injectable({
  providedIn: 'root',
})
export class TestingService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8001/';
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // get solution code for current test
  getSolution(testID: string) {
    return this.http.get<Solution>(`${this.url}solution/${testID}`, { headers: this.headers });
  }

  // create solution code
  postSolution(testID: string, code: string, language: string) {
    const body = new URLSearchParams();
    body.set(language, code);
    return this.http.post<Solution>(`http://localhost:8000/solution/${testID}`, body.toString(), {
      headers: this.headers,
    });
  }

  // update solution code
  patchSolution(solutionID: string, code: string, language: string) {
    const body = new URLSearchParams();
    body.set(language, code);
    return this.http.patch<Solution>(
      `http://localhost:8000/solution/${solutionID}`,
      body.toString(),
      {
        headers: this.headers,
      }
    );
  }

  getTest(testID: string) {
    return this.http.get<Test>(`http://localhost:8000/test/${testID}`, {
      headers: this.headers,
    });
  }

  // run tests on test server and get results
  getTestResults(testID: string) {
    return this.http.get<Results>(`${this.url}${testID}`, {
      headers: this.headers,
    });
  }
}
