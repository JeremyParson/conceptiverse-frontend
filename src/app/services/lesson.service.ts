import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8000/lesson/';

  getLessons() {
    return this.http.get<[Lesson]>(this.url).pipe(
      tap({
        next: (data) => console.log('Lessons', data),
        error: (err) => console.error(err),
      })
    );
  }

  detailLesson(id: string) {
    return this.http.get<Lesson>(`${this.url}${id}`).pipe(
      tap({
        next: (data) => console.log(`Lesson Detail ${id}`, data),
        error: (err) => console.error(err),
      })
    );
  }
}
