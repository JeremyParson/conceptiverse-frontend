import { Component, OnInit } from '@angular/core';
import { LessonService } from '../services/lesson.service';

@Component({
  selector: 'app-lesson-browser',
  templateUrl: './lesson-browser.component.html',
  styleUrls: ['./lesson-browser.component.css']
})
export class LessonBrowserComponent implements OnInit {

  constructor(private lessonService: LessonService) { }

  lessons = this.lessonService.getLessons()

  ngOnInit(): void {
  }

}
