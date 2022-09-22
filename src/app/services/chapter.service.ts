import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8000/chapter/'

  detailChapter (id: string) {
    return this.http.get<Chapter>(`${this.url}${id}`).pipe(
      tap({
        next: (data) => console.log(`Chapter`, data),
        error: (err) => console.error(err)
      })
    )
  }
}
