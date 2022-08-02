import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) this.userLoggedIn = true;
    if (this.userLoggedIn) 
      this.userService.profileUser().subscribe(user => {
        this.userInfo = user
      })
  }

  showLoginForm = false;
  userLoggedIn = false;
  loginInfoGroup = this.formBuilder.group({
    email: '',
    password: '',
  });
  
  userInfo: User = {
    '_id': '',
    'email': '',
    'username': ''
  }

  setShowLoginForm(state: boolean) {
    this.showLoginForm = state;
  }

  onSubmit() {
    const data = this.loginInfoGroup.getRawValue();
    this.userService
      .authenticate(data.email || '', data.password || '')
      .pipe(
        tap({
          next: (data) => {
            localStorage.setItem('token', data.token);
            this.userLoggedIn = true;
            this.userInfo = data.user;
          },
          error: (err) => console.log(err),
        })
      )
      .subscribe();
  }

  logout () {
    this.userService.signOutUser()
    this.userLoggedIn = false
  }
}
