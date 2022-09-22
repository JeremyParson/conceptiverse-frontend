import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
import { LessonService } from '../services/lesson.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.router.params
      .pipe(
        concatMap((params) => this.lessonService.detailLesson(params['id']))
      )
      .subscribe((data) => {
        this.lesson = data;
      });
  }

  lesson: Lesson = {
    _id: '',
    name: '',
    description: '',
    rating: 0,
    comments: [],
    creator: '',
    chapters: [],
  };
}
