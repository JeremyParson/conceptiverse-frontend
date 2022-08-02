import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registrationForm = this.formBuilder.group({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  onSubmit() {
    const values = this.registrationForm.getRawValue();
    console.log(values)
    this.userService
      .registerUser(
        values.email || '',
        values.username || '',
        values.password || ''
      )
      .pipe(
        tap({
          next: (data) => {
            console.log(data)
            this.router.navigate(['..'])
          },
          error: (err) => console.error(err),
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
