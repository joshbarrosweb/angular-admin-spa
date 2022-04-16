import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', './../public.component.scss'],
})
export class RegisterComponent implements OnInit {
  first_name = '';
  last_name = '';
  email = '';
  password = '';
  password_confirm = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submit() {
    this.authService
      .register({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm,
      })
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/login']);
      });
  }
}
