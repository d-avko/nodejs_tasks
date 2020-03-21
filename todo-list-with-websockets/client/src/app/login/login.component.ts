import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usernameControl = new FormControl();
  passwordControl = new FormControl();

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async SignIn() {
    try {
      let response = await this.http.post<{token: string}>( `http://localhost:3001/api/identity/login`, {
        login: this.usernameControl.value,
        password: this.passwordControl.value
      }).toPromise();

      this.auth.setToken(response.token);
      await this.router.navigateByUrl('/');
    }
    catch (e) {
      this.snackBar.open("Incorrect email or password.", null, {duration: 1500});
    }
  }
}
