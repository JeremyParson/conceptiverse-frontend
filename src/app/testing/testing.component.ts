import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, mergeMap, catchError, Observable } from 'rxjs';
import { LessonService } from '../services/lesson.service';
import { CodeModel } from '@ngstack/code-editor';
import { TestingService } from '../services/testing.service';
import { HttpResponse } from '@angular/common/http';
import { Lesson, Results, Solution } from 'src/app';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
})
export class TestingComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private lessonService: LessonService,
    private testingService: TestingService
  ) {}

  // store details about selected lesson
  ngOnInit(): void {
    this.router.params
      .pipe(
        concatMap((params) => this.lessonService.detailLesson(params['id'])),
        concatMap((lesson) => {
          this.lesson = lesson;
          this.testId = lesson.chapters[this.chapterIndex].test._id;
          return this.getSolutionResource();
        })
      )
      .subscribe((solution) => {
        console.log('Solution:', solution);
        this.solutionId = solution._id;
        this.codeModel = {
          language: this.language,
          uri: 'main.json',
          value: solution[this.language],
          dependencies: ['@ngstack/translate', '@ngstack/code-editor'],
        };
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

  chapterIndex: number = 0;
  testId: string = '';
  solutionId: string = '';

  results: Array<Results> = [];

  language: string = 'javascript';

  codeModel: CodeModel = {
    language: 'javascript',
    uri: 'main.json',
    value: '',
    dependencies: ['@ngstack/translate', '@ngstack/code-editor'],
  };

  processChange = this.debounce((value: string) => this.onCodeChanged(value));

  // send code to the testing server and render the results.
  runTest() {
    this.testingService
      .getTestResults(this.lesson.chapters[this.chapterIndex].test._id)
      .subscribe((value) => {
        this.results.push(value);
      });
  }

  // render the results from the test server
  renderResults(results: Results) {
    if (results?.error) {
      console.error('Error', results.error);
    } else {
      console.log('Results', results.results);
    }
  }

  nextChapter() {
    if (this.chapterIndex + 1 >= this.lesson.chapters.length) return;
    this.chapterIndex++;
    this.testId = this.lesson.chapters[this.chapterIndex].test._id;
    this.getSolutionResource().subscribe((solution) => {
      console.log('Solution:', solution);
      this.solutionId = solution._id;
      this.codeModel = {
        language: this.language,
        uri: 'main.json',
        value: solution[this.language],
        dependencies: ['@ngstack/translate', '@ngstack/code-editor'],
      };
    });
  }

  getSolutionResource(): Observable<Solution> {
    console.log("Getting solution for: ", this.testId)
    return this.testingService.getSolution(this.testId).pipe(
      catchError((_err) => {
        console.log('No solution existed prior, creating one now...');
        const test = this.lesson.chapters[this.chapterIndex].test;
        return this.testingService.postSolution(
          test._id,
          test[this.language] as string,
          this.language
        );
      })
    );
  }

  onCodeChanged(value: string) {
    console.log('Code changed, saving to ', this.solutionId);
    this.testingService
      .patchSolution(this.solutionId, value, this.language)
      .subscribe((solution) => {
        console.log("After the save: ", solution)
      });
  }

  debounce(func: Function, timeout = 300) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
}
