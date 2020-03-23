import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  UsernameControl = new FormControl();
  EmailControl = new FormControl();
  PasswordControl = new FormControl();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async Register() {
    try {
      await this.http.post( `http://localhost:3001/api/identity/register`, {
        login: this.UsernameControl.value,
        password: this.PasswordControl.value,
        email: this.EmailControl.value
      }).toPromise();

      await this.router.navigateByUrl('/login');
    }
    catch (e) {
      this.snackBar.open("Incorrect email or password.", null, {duration: 1500});
    }
  }
}
