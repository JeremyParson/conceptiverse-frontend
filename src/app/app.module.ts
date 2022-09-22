// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { CodeEditorModule } from '@ngstack/code-editor';

// App Components
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LessonBrowserComponent } from './lesson-browser/lesson-browser.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonCreatorComponent } from './lesson-creator/lesson-creator.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TestingComponent } from './testing/testing.component';
import { ResultCardComponent } from './result-card/result-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserDashboardComponent,
    LessonBrowserComponent,
    LessonDetailComponent,
    LessonCreatorComponent,
    TestingComponent,
    ResultCardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'register', component: UserRegisterComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'browser', component: LessonBrowserComponent },
      { path: 'browser/:id', component: LessonDetailComponent },
      { path: 'testing/:id', component: TestingComponent }
    ]),
    HttpClientModule,
    CodeEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
